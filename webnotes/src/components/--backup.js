// note prototype with other features and Masonary layout

<div className="noteAria" data-noteno="2" id="2">
  <div className="delete">
    <i className="fas fa-trash"></i>
  </div>
  <div className="note">
    <div className="noteTitle">
      <h3>{props.title}</h3>
    </div>
    <div className="content">
      <p>{props.content}</p>
      <div className="img">
        <img src="../images/image.jfif" alt="" />
      </div>
      <div className="img">
        <img src="../images/image.jfif" alt="" />
      </div>
      <div className="list">
        <ul>
          <li>123</li>
          <li>Destination</li>
          <li>Programs</li>
          <li>Light</li>
        </ul>
      </div>
      <div className="list">
        <ol>
          <li>123</li>
          <li>Destination</li>
          <li>Programs</li>
          <li>Light</li>
        </ol>
      </div>
      <div className="checkList">
        <div className="item">
          <input type="checkbox" id="1" />
          <label htmlFor="1">item 1</label>
        </div>
        <div className="item">
          <input type="checkbox" id="2" />
          <label htmlFor="2">item 2</label>
        </div>
        <div className="item">
          <input type="checkbox" id="3" />
          <label htmlFor="3">item 3</label>
        </div>
      </div>
    </div>
    <div className="tags">
      <span className="tag">132</span>
      <span className="tag">note</span>
      <span className="tag">imageWithNote</span>
      <span className="tag">aBCs</span>
    </div>
    <div className="tagsLimitError" style={{ color: "#8f0202" }}></div>
  </div>
</div>;

// ================================================
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
        autoFocus="off"
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
        Reset
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
</div>;
