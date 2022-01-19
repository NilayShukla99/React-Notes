import React from "react";
import ReactMarkdown from "react-markdown";

const ActiveNote = ({ activeNote }) => {
  //   returns id
  const id = (id) => {
    return document.getElementById(id);
  };

  // fetching modal details
  const modal = id("activeModal");

  // close the modal
  function closeActiveNote() {
    modal.style.display = "none";
  }

  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };

  // prevent submit
  //   const prevent_default = (e) => {
  //     e.preventDefault();
  //   };
  return (
    <>
      <div id="activeModal" className="modal">
        {/* Modal content  */}
        <div className="modalContent">
          <span
            className="close"
            id="activeNoteClose"
            onClick={closeActiveNote}
          >
            &times;
          </span>
          {/* inputs */}
          <div className="activeNote modalInput">
            {/* Note title */}
            <h2 className="title">{activeNote.title}</h2>

            {/* tags details */}
            <div className="visibleTags">{activeNote.tags}</div>

            {/* update note details */}
            <ReactMarkdown className="content">
              {activeNote.content}
            </ReactMarkdown>
          </div>

          {/* update note btn */}
          {/* <div className="addBtn">
            <button
              name="edit"
              className="btn"
              onSubmit={prevent_default}
              type="submit"
            >
              Edit
            </button>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default ActiveNote;
