// src/components/TinyMCEEditor.js
import React, { useEffect, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

const TinyMCEEditor = ({ onSubmit }) => {
  const editorRef = useRef(null);

  const handleLogHTML = () => {
    if (editorRef.current) {
      const content = editorRef.current.getContent();
      //   console.log(editorRef.current.getContent());
      onSubmit(content);
    }
  };

  return (
    <div>
      <Editor
        apiKey="me5pu1t51rcxdducpg74at9ism4zi2txm4gekezz5m1xlaiy"
        onInit={(_evt, editor) => (editorRef.current = editor)}
        init={{
          plugins: [
            "advlist autolink lists link image preview hr anchor pagebreak",
            "searchreplace wordcount code",
            "insertdatetime media nonbreaking table contextmenu directionality",
            "paste textcolor textpattern imagetools",
            "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown",
          ],
          toolbar:
            "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
          image_advtab: true,
          removed_menuitems: "newdocument",
          content_css: [
            "//fonts.googleapis.com/css?family=Lato:300,300i,400,400i",
          ],
          menu: {
            table: {
              title: "Table",
              items:
                "inserttable | cell row column | advtablerowprops advtablecellprops | deletetable",
            },
          },
          contextmenu: "link image table",
          table_advtablerowprops: true,
          table_advtablecellprops: true,

          table_cell_class_list: [
            { title: "None", value: "" },
            { title: "Custom Style 1", value: "custom-style-1" },
            { title: "Custom Style 2", value: "custom-style-2" },
          ],

          tinycomments_mode: "embedded",
          tinycomments_author: "Author name",

          mergetags_list: [
            { value: "First.Name", title: "First Name" },
            { value: "Email", title: "Email" },
          ],
          ai_request: (request, respondWith) =>
            respondWith.string(() =>
              Promise.reject("See docs to implement AI Assistant")
            ),
        }}
        initialValue="Welcome to TinyMCE!"
      />
      <button onClick={handleLogHTML}>Submit</button>
    </div>
  );
};

export default TinyMCEEditor;
