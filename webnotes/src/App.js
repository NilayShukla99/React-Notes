// import Main from "./components/Main.js";
import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import LoginPage from "./components/LoginPage.js";
import Header from "./components/Header.js";
import Note from "./components/Note.js";
import CreateNote from "./components/CreateNote";
import ActiveNote from "./components/ActiveNote.js";

// react router
import {
  BrowserRouter as Router,
  Switch,
  Route,
  //   Link,
  //   Redirect,
} from "react-router-dom";
// import { useHistory } from "react-router";

// stylesheets
import "./stylesheets/App.css"; //includes header and footer etc
import "./stylesheets/Login.css";
import "./stylesheets/Note.css"; //notes styling
import "./stylesheets/ResultPage.css"; //ResultPage styling
import notesImage from "./images/note.png";

function App() {
  const auth = getAuth();
  const [userProfile, setuserProfile] = useState();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setuserProfile(user.displayName ? user.displayName : user.email);
    }
  });

  //   notes List
  const [NotesList, setNotesList] = useState([
    {
      id: 123132,
      title: "the title",
      content: `
      
headings 
--------
(===== or -----)

text
----
italic (*text*)
bold (**text**)
strikethrough (~~text~~)

list
----
1. 2. 3. for ol
star(* or +) for ul

Links
------
[alt text](link link)
[alt text](online img link)
[alt text](online video link)

Horizontal rule
-------------
---

video
------
[[alt text](online cover img)](video link)
`,
      tags: ["text", "markdown"],
      date: "tue 31 Oct 2020",
    },
  ]);

  //   add note to notesList
  const addNote = (title, content, tags, date) => {
    const note = {
      id: Math.round(Math.random() * 1000 * NotesList.length + 1),
      title: title,
      content: content,
      tags: tags.trim().split(" "), //trim will remove first and last space and returns string
      date: date,
    };
    // const newNote = NotesList.concat(note);
    const newNote = [...NotesList, note];
    setNotesList(newNote);
  };

  //   add to local storage
  useEffect(() => {
    window.localStorage.setItem("WebNotes", JSON.stringify(NotesList));
  }, [NotesList]);

  //   retrieve noes
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("WebNotes"));
    setNotesList(savedNotes);
  }, []);

  //   deletes Note
  const deleteNote = (id, title) => {
    const newList = NotesList.filter((note) => {
      return note.id !== id;
    });
    const confirmMsg = window.confirm(`${title} will be deleted permanently`);
    if (confirmMsg && setNotesList(newList));
  };

  //   open NOte
  const [activeNoteData, setActiveNoteData] = useState({
    id: "",
    title: "",
    content: "",
    tags: "",
    date: "",
  });
  const openNote = (id, title, content, tags, date) => {
    setActiveNoteData({
      id: id,
      title: title,
      content: content,
      tags: tags,
      date: date,
    });
    const opNote = document.getElementById("activeModal");
    opNote.style.display = "block";
  };

  return (
    <>
      <Router>
        <Switch>
          {/* <Route exact path="/">
            {loggedIn ? <Redirect to="/home" /> : <Redirect to="/auth" />}
          </Route> */}
          <Route path="/auth">
            <LoginPage />
          </Route>
          <Route path="/">
            <Header
              username={userProfile}
              notes={NotesList}
              siteName="WebNotes"
              handleDelete={deleteNote}
              handleOpenNote={openNote}
            />
            <main>
              {NotesList.length === 0 ? (
                <div id="emptyMessage">
                  <h2>
                    👋<span> Hey! </span>UserName
                  </h2>
                  <img src={notesImage} alt="notes logo" />
                  <h3>To add some notes click +</h3>
                </div>
              ) : (
                <div className="container" id="container">
                  {NotesList.map((note) => {
                    return (
                      <Note
                        handleDelete={deleteNote}
                        handleOpenNote={openNote}
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
              )}
              <CreateNote
                handleSetNote={addNote}
                notesLength={NotesList.length}
              />
              <ActiveNote activeNote={activeNoteData} />
            </main>
          </Route>
        </Switch>

        <footer>
          WebNotes is a text based notes taking React.js Web Application.
        </footer>
      </Router>
    </>
  );
}

export default App;
