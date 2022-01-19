import React, { useState } from "react";

const CreateNote = ({ handleSetNote, notesLength }) => {
  //   returns id
  const id = (id) => {
    return document.getElementById(id);
  };

  // modal to add note
  const openModal = () => {
    // fetching modal details
    const modal = id("myModal");
    const spanModal = document.getElementsByClassName("close")[0];

    // for tags
    const writeTags = id("writeTags");
    const showTagsBtn = id("showTagsBtn");
    const tagsField = id("tagsField");

    //   for styling tags field
    let display = false;

    // open the modal
    modal.style.display = "block";
    modal.focus();

    // close the modal
    spanModal.onclick = function () {
      modal.style.display = "none";
    };

    window.onclick = function (event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    };

    // showing tags field
    showTagsBtn.onclick = () => {
      if (display === false) {
        tagsField.style.width = "100%";
        writeTags.style.display = "flex";
        writeTags.style.opacity = "1";

        display = true;
      } else {
        tagsField.style.width = "87px";
        writeTags.style.display = "none";
        writeTags.style.opacity = "0";
        display = false;
      }
    };
  };

  // create button preventDefault
  const prevent_default = (e) => {
    e.preventDefault();
  };

  //   user added data initially/ default value
  const date = new Date().toDateString();
  const [UserText, setUserText] = useState({
    title: "",
    content: "",
    tags: "",
    date: date,
  });

  //   onchange
  const handleChange = (event) => {
    let value = event.target.value.replace(/ +/g, " ");
    let name = event.target.name;

    // to allow limited char length in title
    if (name === "title") {
      value = value.slice(0, 50);
      setUserText({ ...UserText, [name]: value });
    }
    // to restrict user to use four tags at max
    else if (name === "tags") {
      value = value.split(" ").slice(0, 4).join(" ");
      setUserText({ ...UserText, [name]: value });
    }
    // to enable writing in any(anyother) input fields
    else {
      setUserText({ ...UserText, [name]: value });
    }
  };

  //   handleNote and sending data to app.js
  const setNote = (event) => {
    if (event.target.name !== "reset" && (UserText.content || UserText.title)) {
      handleSetNote(
        UserText.title ? UserText.title : `Note ${(notesLength += 1)}`,
        UserText.content,
        UserText.tags.toLowerCase(),
        UserText.date
      );
      const modal = id("myModal");
      modal.style.display = "none";
      setUserText({
        title: "",
        content: "",
        tags: "",
        date: date,
      });
    } else {
      setUserText({
        title: "",
        content: "",
        tags: "",
        date: date,
      });
    }
  };

  return (
    <>
      {/* create (+) button */}
      <div
        className="btn createNoteBtn"
        id="createNote"
        onClick={openModal}
        onSubmit={prevent_default}
      >
        <button type="submit">+</button>
      </div>

      {/* modal */}
      <div id="myModal" className="modal">
        {/* Modal content  */}
        <div className="modalContent">
          <span className="close">&times;</span>
          {/* inputs */}
          <div className="modalInput">
            <input
              type="text"
              id="writeTitle"
              name="title"
              placeholder="Title"
              value={UserText.title}
              onChange={handleChange}
              autoComplete="off"
            />
            {/* remaining chars indicator */}
            {UserText.title.length === 0 ? (
              ""
            ) : (
              <span className="charCounter">
                {50 - UserText.title.length} chars remaining...
              </span>
            )}

            {/* tags details */}
            <div id="tagsField" className="tagsField">
              <span
                id="showTagsBtn"
                className="btn showTagsBtn"
                style={{
                  backgroundColor: "skyblue",
                  userSelect: "none",
                }}
              >
                Add Tag
              </span>

              <input
                type="search"
                id="writeTags"
                name="tags"
                placeholder="add tags to find quickly"
                value={UserText.tags.toLowerCase()}
                onChange={handleChange}
              />
            </div>
            <div className="visibleTags">
              {UserText.tags.split(" ").map((item) => {
                return <span key={item}>{item}</span>;
              })}
            </div>

            {/* info about text formatting */}
            <div className="textFormattingInfo">
              <span>i</span>
              <div className="textFormatting">
                <div className="grpLabel Headding">Headding</div>
                <div className="sub-list">
                  <div>add === or ----- under text</div>
                </div>
                <div className="grpLabel Formatting">Text</div>
                <div className="sub-list">
                  <div>italic (*text*) or (_text_)</div>
                  <div>bold (**text**) or (__text__)</div>
                  <div>strikethrough (~~text~~)</div>
                </div>
                <div className="grpLabel List">List</div>
                <div className="sub-list">
                  <div>1. 2. 3. for ol</div>
                  <div>star(* or +) for ul</div>
                </div>

                <div className="grpLabel Links">Links</div>
                <div className="sub-list">
                  <div>[alt text](link link)</div>
                  <div>[alt text](online img link)</div>
                  <div>[alt text](online video link)</div>
                  <div>[[alt text](online cover img)](video link)</div>
                </div>
                <div className="grpLabel Divider">Divider</div>
                <div className="sub-list">
                  <div>Horizontal rule ---</div>
                </div>
              </div>
            </div>

            {/* add note details */}
            <textarea
              id="writeContent"
              name="content"
              placeholder="Start typing here..."
              value={UserText.content}
              onChange={handleChange}
            ></textarea>
          </div>
          {/* add note btn */}
          <div className="addBtn">
            <button
              name="reset"
              className="btn"
              onClick={setNote}
              onSubmit={prevent_default}
              type="submit"
            >
              Clear
            </button>
            <button
              name="add"
              className="btn"
              onClick={setNote}
              onSubmit={prevent_default}
              type="submit"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateNote;
