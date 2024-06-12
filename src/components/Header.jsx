import React from 'react';
import './header.css'
const HeaderSect = () => {
    return (
      <>
        <div className="headerSect">
          <div className="title">
            <h1>GITHUB FINDER</h1>
          </div>
          <p>
            By<span> Dennis Otwoma </span>
          </p>

          <div className="searchInput">
            <input type="text" placeholder="Enter a username" />
            <button type="button"> Search</button>
          </div>
        </div>
      </>
    );
}
const Header = () => {
    return <div>
        <HeaderSect />
    </div>;
}


export default Header;