import React from "react";
import ReactMarkdown from "react-markdown";

// props destructuring
// using {key, title, ...} instead of (props and then id etc...)
// { id, title, content, date }
const Note = ({
  id,
  style,
  title,
  content,
  tags,
  date,
  handleDelete,
  handleOpenNote,
}) => {
  const idToDelete = () => {
    handleDelete(id, title);
  };

  const idToOpenNote = () => {
    handleOpenNote(id, title, content, tags, date);
  };

  return (
    <>
      <div className="noteCard" data-noteno={id} id={id} style={style}>
        <div className="delete" onClick={idToDelete}>
          <i className="fas fa-trash"></i>
        </div>
        <div
          className="note"
          onClick={idToOpenNote}
          title={`${title}, ${date}`}
        >
          <div className="noteTitle">
            <h3>{title}</h3>
          </div>
          <div className="content">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        </div>
        <div className="tags">{tags}</div>
        <div className="date">{date}</div>
      </div>
    </>
  );
};

// Note.defaultProps = {
//   title: "Note Title",
// };
export default Note;
