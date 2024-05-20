// import React from "react";
// import * as RGL_UTILS from "/node_modules/react-grid-layout/build/utils";
// import {
//   sortLayoutItems,
//   cloneLayoutItem,
//   getAllCollisions,
//   moveElement as originalMoveElement,
//   correctBounds,
//   compact as originalCompact,
// } from "/node_modules/react-grid-layout/build/utils";

// RGL_UTILS.compact = function compact(layout, compactType, cols) {
//   const sorted = sortLayoutItems(layout, "vertical");
//   const out = Array(layout.length);

//   for (let i = 0, len = sorted.length; i < len; i++) {
//     let l = cloneLayoutItem(sorted[i]);

//     if (!l.static) {
//       l.y = Math.floor(i / cols);
//       l.x = i % cols;
//     }
//     out[i] = l;
//     l.moved = false;
//   }
//   return out;
// };

// RGL_UTILS.moveElement = function (
//   layout,
//   l,
//   x,
//   y,
//   isUserAction,
//   preventCollision,
//   compactType,
//   cols,
//   isLeftShift
// ) {
//   if (l.static && l.isDraggable !== true) return layout;

//   if (l.y === y && l.x === x) return layout;

//   const oldX = l.x;
//   const oldY = l.y;

//   if (typeof x === "number") l.x = x;
//   if (typeof y === "number") l.y = y;
//   l.moved = true;

//   let sorted = sortLayoutItems(layout, compactType);
//   const movingUp =
//     compactType === "vertical" && typeof y === "number"
//       ? oldY >= y
//       : compactType === "horizontal" && typeof x === "number"
//       ? oldX >= x
//       : false;
//   if (movingUp) sorted = sorted.reverse();
//   const collisions = getAllCollisions(sorted, l);

//   if (preventCollision && collisions.length) {
//     l.x = oldX;
//     l.y = oldY;
//     l.moved = false;
//     return layout;
//   }

//   if (isUserAction) {
//     isUserAction = false;
//     if (oldX === x) isLeftShift = oldY - y <= 0;
//     if (oldY === y) isLeftShift = oldX - x <= 0;
//   }

//   for (let i = 0, len = collisions.length; i < len; i++) {
//     const collision = collisions[i];

//     if (collision.moved) continue;

//     if (collision.static) {
//       layout = RGL_UTILS.moveElementAwayFromCollision(
//         layout,
//         collision,
//         l,
//         isUserAction,
//         compactType,
//         cols,
//         isLeftShift
//       );
//     } else {
//       layout = RGL_UTILS.moveElementAwayFromCollision(
//         layout,
//         l,
//         collision,
//         isUserAction,
//         compactType,
//         cols,
//         isLeftShift
//       );
//     }
//   }

//   return layout;
// };

// RGL_UTILS.moveElementAwayFromCollision = function moveElementAwayFromCollision(
//   layout,
//   collidesWith,
//   itemToMove,
//   isUserAction,
//   compactType,
//   cols,
//   isLeftShift
// ) {
//   const compactH = compactType === "horizontal";
//   const preventCollision = collidesWith.static;
//   const isTileWrapping = isLeftShift
//     ? itemToMove.x - 1 < 0
//     : itemToMove.x + 1 >= cols;
//   const deltaShift = isLeftShift ? -1 : 1;
//   const x = isTileWrapping
//     ? isLeftShift
//       ? cols - 1
//       : 0
//     : itemToMove.x + deltaShift;
//   const y = isTileWrapping ? itemToMove.y + deltaShift : itemToMove.y;

//   return originalMoveElement(
//     layout,
//     itemToMove,
//     compactH ? x : undefined,
//     y,
//     isUserAction,
//     preventCollision,
//     compactType,
//     cols,
//     isLeftShift
//   );
// };

// RGL_UTILS.synchronizeLayoutWithChildren =
//   function synchronizeLayoutWithChildren(
//     initialLayout,
//     children,
//     cols,
//     compactType,
//     allowOverlap
//   ) {
//     initialLayout = initialLayout || [];
//     const layout = [];

//     React.Children.forEach(children, (child) => {
//       if (child?.key == null) return;
//       const exists = RGL_UTILS.getLayoutItem(initialLayout, String(child.key));
//       const g = child.props["data-grid"];

//       if (exists && g == null) {
//         layout.push(RGL_UTILS.cloneLayoutItem(exists));
//       } else {
//         if (g) {
//           if (!isProduction) {
//             RGL_UTILS.validateLayout([g], "ReactGridLayout.children");
//           }
//           layout.push(RGL_UTILS.cloneLayoutItem({ ...g, i: child.key }));
//         } else {
//           layout.push(
//             RGL_UTILS.cloneLayoutItem({
//               w: 1,
//               h: 1,
//               x: 0,
//               y: RGL_UTILS.bottom(layout),
//               i: String(child.key),
//             })
//           );
//         }
//       }
//     });

//     const correctedLayout = RGL_UTILS.correctBounds(layout, { cols });
//     return allowOverlap
//       ? correctedLayout
//       : RGL_UTILS.compact(correctedLayout, compactType, cols);
//   };

import React from "react";
import * as RGL_UTILS from "react-grid-layout/build/utils";
import {
  sortLayoutItems,
  getLayoutItem,
  cloneLayoutItem,
  validateLayout,
  correctBounds,
  getAllCollisions,
  bottom,
  compact,
  moveElement,
} from "react-grid-layout/build/utils";

RGL_UTILS.compact = function compact(layout, compactType, cols) {
  // We go through the items by row and column.
  const sorted = sortLayoutItems(layout, "vertical");
  // Holding for new items.
  const out = Array(layout.length);

  for (let i = 0, len = sorted.length; i < len; i++) {
    let l = cloneLayoutItem(sorted[i]);

    // Don't move static elements
    if (!l.static) {
      l.y = Math.floor(i / cols);
      l.x = i % cols;
    }
    // Add to output array to make sure they still come out in the right order.
    out[i] = l;
    // Clear moved flag, if it exists.
    l.moved = false;
  }
  return out;
};

/* No code is added here. It's just copied from library otherwise grid wont call our overrided compact method */
RGL_UTILS.synchronizeLayoutWithChildren =
  function synchronizeLayoutWithChildren(
    initialLayout,
    children,
    cols,
    compactType,
    allowOverlap
  ) {
    initialLayout = initialLayout || [];

    // Generate one layout item per child.
    const layout /*: LayoutItem[]*/ = [];
    React.Children.forEach(children, (child /*: ReactElement<any>*/) => {
      // Child may not exist
      if (child?.key == null) return;
      const exists = getLayoutItem(initialLayout, String(child.key));
      const g = child.props["data-grid"];
      // Don't overwrite the layout item if it's already in the initial layout.
      // If it has a `data-grid` property, prefer that over what's in the layout.
      if (exists && g == null) {
        layout.push(cloneLayoutItem(exists));
      } else {
        // Hey, this item has a data-grid property, use it.
        if (g) {
          //   if (!isProduction) {
          //     validateLayout([g], "ReactGridLayout.children");
          //   }
          // FIXME clone not really necessary here
          layout.push(
            cloneLayoutItem({
              ...g,
              i: child.key,
            })
          );
        } else {
          // Nothing provided: ensure this is added to the bottom
          // FIXME clone not really necessary here
          layout.push(
            cloneLayoutItem({
              w: 1,
              h: 1,
              x: 0,
              y: bottom(layout),
              i: String(child.key),
            })
          );
        }
      }
    });

    // Correct the layout.
    const correctedLayout = correctBounds(layout, {
      cols: cols,
    });
    return allowOverlap
      ? correctedLayout
      : compact(correctedLayout, compactType, cols);
  };

/* All code is re-used from the original method except the 'isLeftShift' related code. */
RGL_UTILS.moveElement = (
  layout,
  l,
  x,
  y,
  isUserAction,
  preventCollision,
  compactType,
  cols,
  isLeftShift // overriden - nitesh
) => {
  // If this is static and not explicitly enabled as draggable,
  // no move is possible, so we can short-circuit this immediately.
  if (l.static && l.isDraggable !== true) return layout;

  // Short-circuit if nothing to do.
  if (l.y === y && l.x === x) return layout;

  console.log(
    `Moving element ${l.i} to [${String(x)},${String(y)}] from [${l.x},${l.y}]`
  );
  const oldX = l.x;
  const oldY = l.y;

  // This is quite a bit faster than extending the object
  if (typeof x === "number") l.x = x;
  if (typeof y === "number") l.y = y;
  l.moved = true;

  // If this collides with anything, move it.
  // When doing this comparison, we have to sort the items we compare with
  // to ensure, in the case of multiple collisions, that we're getting the
  // nearest collision.
  let sorted = sortLayoutItems(layout, compactType);
  const movingUp =
    compactType === "vertical" && typeof y === "number"
      ? oldY >= y
      : compactType === "horizontal" && typeof x === "number"
      ? oldX >= x
      : false;
  if (movingUp) sorted = sorted.reverse();
  const collisions = getAllCollisions(sorted, l);

  // There was a collision; abort
  if (preventCollision && collisions.length) {
    console.log(`Collision prevented on ${l.i}, reverting.`);
    l.x = oldX;
    l.y = oldY;
    l.moved = false;
    return layout;
  }
  // overriden - nitesh
  if (isUserAction) {
    isUserAction = false;
    if (oldX === x) isLeftShift = oldY - y <= 0;
    if (oldY === y) isLeftShift = oldX - x <= 0;
  }
  // Move each item that collides away from this element.
  for (let i = 0, len = collisions.length; i < len; i++) {
    const collision = collisions[i];
    console.log(
      `Resolving collision between ${l.i} at [${l.x},${l.y}] and ${collision.i} at [${collision.x},${collision.y}]`
    );

    // Short circuit so we can't infinite loop
    if (collision.moved) continue;

    // Don't move static items - we have to move *this* element away
    if (collision.static) {
      layout = RGL_UTILS.moveElementAwayFromCollision(
        layout,
        collision,
        l,
        isUserAction,
        compactType,
        cols,
        isLeftShift // overriden - nitesh
      );
    } else {
      layout = RGL_UTILS.moveElementAwayFromCollision(
        layout,
        l,
        collision,
        isUserAction,
        compactType,
        cols,
        isLeftShift // overriden - nitesh
      );
    }
  }

  return layout;
};

RGL_UTILS.moveElementAwayFromCollision = function moveElementAwayFromCollision(
  layout,
  collidesWith,
  itemToMove,
  isUserAction,
  compactType,
  cols,
  isLeftShift
) {
  const compactH = compactType === "horizontal";

  const preventCollision = collidesWith.static; // we're already colliding (not for static items)
  const isTileWrapping = isLeftShift
    ? itemToMove.x - 1 < 0
    : itemToMove.x + 1 >= cols;
  const deltaShift = isLeftShift ? -1 : 1;
  const x = isTileWrapping
    ? isLeftShift
      ? cols - 1
      : 0
    : itemToMove.x + deltaShift;
  const y = isTileWrapping ? itemToMove.y + deltaShift : itemToMove.y;

  return moveElement(
    layout,
    itemToMove,
    compactH ? x : undefined,
    y,
    isUserAction,
    preventCollision,
    compactType,
    cols,
    isLeftShift
  );
};
