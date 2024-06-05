import React, { useState, useRef } from "react";
import ReactModal from "react-modal";
import { Editor } from "@tinymce/tinymce-react";
import "../Styles/CustomComponent.css";

ReactModal.setAppElement("#root");

const CustomComponent = ({ addCustomComponent }) => {
  const [showModal, setShowModal] = useState(false);
  const editorRef = useRef(null);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleHtmlSubmit = () => {
    if (editorRef.current) {
      const content = editorRef.current.getContent();
      if (content.trim() !== "") {
        addCustomComponent(content);
        handleCloseModal();
      }
    }
  };

  const handleCloseModal = () => {
    console.log("Closing modal");
    setShowModal(false);
  };

  return (
    <div>
      <button onClick={handleOpenModal}>Add Custom Component</button>
      <ReactModal
        isOpen={showModal}
        onRequestClose={handleCloseModal}
        contentLabel="Minimal Modal Example"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            width: "75%", // Set the desired width
            height: "90%", // Set the desired height
            margin: "auto", // Center the modal horizontally and vertically
          },
        }}
      >
        <div className="modal-content">
          <span className="close-button" onClick={handleCloseModal}>
            &times;
          </span>
          <div className="editor-container">
            <Editor
              apiKey="me5pu1t51rcxdducpg74at9ism4zi2txm4gekezz5m1xlaiy"
              onInit={(_evt, editor) => (editorRef.current = editor)}
              init={{
                plugins:
                  "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown",
                toolbar:
                  "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
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
              initialValue="Create Your Component"
            />
          </div>
          <button className="submit-button" onClick={handleHtmlSubmit}>
            Submit
          </button>
        </div>
      </ReactModal>
    </div>
  );
};

export default CustomComponent;
