import React from "react";
import { useState } from "react";
import "./header.css";
const HeaderSect = () => {
  const [userSearch, setUserSearch] = useState();

  const userInput = (event) => {
    setUserSearch(event.target.value);
  };
  const handleUserSearch = (event) => {
    userInput();
  };

  console.log(userSearch);
  return (
    <>
      <div className="headerSect">
        <div className="title">
          <h1>GITHUB FINDER</h1>
        </div>
        <p>
          By<span> Wilfred Muchire </span>
        </p>

        <div className="searchInput">
          <input
            value={userSearch}
            onChange={userInput}
            type="text"
            placeholder="Enter a username"
          />
          <button type="button" onClick={handleUserSearch}>
            {" "}
            Search
          </button>
        </div>
      </div>
    </>
  );
};
const Header = () => {
  return (
    <div>
      <HeaderSect />
    </div>
  );
};

export default Header;
