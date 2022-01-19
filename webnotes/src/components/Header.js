import React, { useState } from "react";
import ResultPage from "./ResultPage";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";
// import { useHistory } from "react-router";
import { Link } from "react-router-dom";

const Header = ({
  siteName,
  username,
  notes,
  handleDelete,
  handleOpenNote,
}) => {
  const auth = getAuth();
  const signOutBtn = document.getElementById("signOut");
  onAuthStateChanged(auth, (user) => {
    if (signOutBtn !== null) {
      signOutBtn.onclick = () => {
        if (user) {
          signOut(auth)
            .then(() => {
              alert("signed out");
            })
            .catch((error) => {
              alert(error);
            });
        }
      };
    }
  });

  const [name, setName] = useState(
    auth.currentUser ? auth.currentUser.displayName : ""
  );

  const updateName = () => {
    setName(prompt("Enter Name: "));
    // auth.currentUser.displayName = name;
    console.log(auth.currentUser);

    updateProfile(auth.currentUser, {
      displayName: name,
    })
      .then(() => {
        // alert(`${name} updated.`);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const userImg = `https://joeschmoe.io/api/v1/${username}`;
  //   const userImg = `https://joeschmoe.io/api/v1/${name}`;
  // searchbar value
  const [InputValue, setInputValue] = useState("");

  //   handle change
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  // search function
  //   1. search into the titles
  const [filteredList, setFilteredList] = useState([]);
  //   2. search the tags
  const [filteredTag, setFilteredTag] = useState([]);
  //   3. search usign date
  const [filteredDate, setFilteredDate] = useState([]);

  //    search funcionality
  const searchFunction = () => {
    if (InputValue) {
      //   through title
      // const titleData = notes.filter((note) => {
      //   return note.title
      //     .toLowerCase()
      //     .includes(InputValue.toLowerCase());
      // });
      let inputWords = InputValue.toLowerCase().split(" ");

      let titleData = [];
      for (const note of notes) {
        for (const word of inputWords) {
          if (note.title.toLowerCase().includes(word)) {
            titleData.push(note);
          }
        }
        // to remove duplicates
        titleData = titleData.filter((item, index, arr) => {
          return arr.indexOf(item) === index;
        });
      }
      setFilteredList(titleData);

      //   through tags
      let tagData = []; //tags is in array form
      for (const note of notes) {
        for (const word of inputWords) {
          if (note.tags.includes(word)) {
            tagData.push(note);
          }
        }
        // to remove duplicates
        tagData = [...new Set(tagData)];
      }
      setFilteredTag(tagData);

      //   through date
      const dateArray = InputValue.split("-");
      const dateMonth = {
        "01": "Jan",
        "02": "Feb",
        "03": "Mar",
        "04": "Apr",
        "05": "May",
        "06": "Jun",
        "07": "Jul",
        "08": "Aug",
        "09": "Sep",
        10: "Oct",
        11: "Nov",
        12: "Dec",
      };
      const dateData = notes.filter((note) => {
        return (
          note.date.split(" ").includes(dateArray[0]) ||
          note.date.split(" ").includes(dateMonth[dateArray[1]]) ||
          note.date.split(" ").includes(dateArray[2])
        );
      });
      setFilteredDate(dateData);
    }
  };

  //   display search section when searchbar is clicked
  const [style, setStyle] = useState({
    display: "none",
    visibility: "hidden",
    opacity: "0",
  });

  //   open/ shows searchbar section in result page
  const showStyle = () => {
    setStyle({
      display: "block",
      visibility: "visible",
      opacity: "1",
    });

    //searchbar close section button/ date Picker
    const header = document.getElementsByTagName("header")[0];
    if (header.childElementCount < 4) {
      // creating closing button
      const closeBtn = document.createElement("button");
      closeBtn.innerText = "close";
      closeBtn.setAttribute("id", "closeBtn");
      closeBtn.onclick = () => {
        hideStyle();
      };
      header.appendChild(closeBtn);

      //   creating date picker
      const datePicker = document.createElement("input");
      datePicker.setAttribute("type", "date");
      datePicker.setAttribute("id", "datePicker");
      datePicker.onchange = () => {
        const dateFormate = datePicker.value.split("-");
        setInputValue(`${dateFormate[2]}-${dateFormate[1]}-${dateFormate[0]}`);
      };

      header.appendChild(datePicker);
    }
  };

  //   close/ hides searchbar section
  const hideStyle = () => {
    const closeBtn = document.getElementById("closeBtn");
    closeBtn.parentElement.removeChild(closeBtn);
    const datePicker = document.getElementById("datePicker");
    datePicker.parentElement.removeChild(datePicker);

    // hiding section
    setStyle({
      display: "none",
      visibility: "hidden",
      opacity: "0",
    });

    //to clear results after closing
    setInputValue("");
    setFilteredList([]);
    setFilteredTag([]);
    setFilteredDate([]);
  };

  return (
    <>
      <header>
        <div className="siteTitle">
          <a href="/">{siteName}</a>
        </div>
        <div className="searchBar">
          <label htmlFor="searchText">
            <i className="fas fa-filter"></i>
          </label>
          <input
            id="searchText"
            type="search"
            name="searchText"
            value={InputValue}
            onChange={handleChange}
            onKeyUp={searchFunction}
            onClick={showStyle}
            onFocus={showStyle}
            placeholder="Title, Tags or Date"
            autoComplete="off"
          />
        </div>
        <div className="signIn">
          <img
            src={userImg}
            alt={username}
            title="set Displayed name"
            onClick={updateName}
          />
          <Link to="/auth">
            <button className="signOut" id="signOut">
              sign out
            </button>
          </Link>
          <p id="userName">{name ? name : username}</p>
        </div>
      </header>
      <ResultPage
        style={style}
        filteredData={filteredList}
        filteredTagData={filteredTag}
        filteredDateData={filteredDate}
        handleDelete={handleDelete}
        handleOpenNote={handleOpenNote}
      />
    </>
  );
};

export default Header;
