import React from "react";
import { useState } from "react";
import "./header.css";
import getUserData from "../store/gitInforStore";
const HeaderSect = () => {
  const [inputValue, setInputValues] = useState("");
  const userName = getUserData((state) => state.userGitName);
  const userData = getUserData((state) => state.fetchData);

  const handleUserSearch = () => {
    userName(inputValue);
    userData(inputValue);
  };

  console.log(inputValuesd);
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
            value={inputValue}
            onChange={(event) => setInputValues(event.target.value)}
            type="text"
            placeholder="Enter a username"
          />
          <button type="button" onClick={handleUserSearch}>
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
