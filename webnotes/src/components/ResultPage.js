// import React, { useState } from "react";
import Note from "./Note";

const ResultPage = ({
  filteredData,
  filteredTagData,
  filteredDateData,
  style,
  handleDelete,
  handleOpenNote,
}) => {
  return (
    <>
      <div className="resultPage" style={style}>
        <div className="results">
          <div id="results1" className="results_matched">
            <h2>date Matches</h2>
            {filteredDateData.map((note) => {
              return (
                <Note
                  handleDelete={handleDelete}
                  handleOpenNote={handleOpenNote}
                  key={note.id}
                  id={note.id}
                  title={note.title}
                  content={note.content}
                  tags={note.tags.map((tag) => {
                    return <span key={tag}>{tag}</span>;
                  })}
                  date={note.date}
                />
              );
            })}
          </div>

          <div className="results_matched">
            <h2>Tag matched</h2>
            {filteredTagData.map((note) => {
              return (
                <Note
                  handleDelete={handleDelete}
                  key={note.id}
                  id={note.id}
                  title={note.title}
                  content={note.content}
                  tags={note.tags.map((tag) => {
                    return <span key={tag}>{tag}</span>;
                  })}
                  date={note.date}
                />
              );
            })}
          </div>

          <div className="results_matched">
            <h2>Title matches</h2>
            {filteredData.map((note) => {
              return (
                <Note
                  handleDelete={handleDelete}
                  key={note.id}
                  id={note.id}
                  title={note.title}
                  content={note.content}
                  tags={note.tags.map((tag) => {
                    return <span key={tag}>{tag}</span>;
                  })}
                  date={note.date}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ResultPage;
