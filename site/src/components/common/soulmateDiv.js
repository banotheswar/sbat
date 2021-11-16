import React from "react";
function SoulMateDiv() {
  return (
    <>
      <div
        className="w3l_find-soulmate text-center"
        style={{ backgroundColor: "white", paddingBottom: "1%" }}
      >
        <h3
          style={{
            letterSpacing: "2px",
            color: "darkorange",
          }}
        >
          Find Your Soulmate
        </h3>
        <div className="container" style={{ width: "900px" }}>
          <a className="scroll" href="#home">
            <div className="col-md-4 w3_soulgrid" style={{ width: "31%" }}>
              <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
              <h3>Sign Up</h3>
              <p>upload your profile</p>
            </div>
          </a>
          <a className="scroll" href="#home">
            <div className="col-md-4 w3_soulgrid" style={{ width: "31%" }}>
              <i className="fa fa-search" aria-hidden="true"></i>
              <h3>Search</h3>
              <p>your right partner</p>
            </div>
          </a>
          <a className="scroll" href="#home">
            <div className="col-md-4 w3_soulgrid" style={{ width: "31%" }}>
              <i className="fa fa-users" aria-hidden="true"></i>
              <h3>Connect</h3>
              <p>with your perfect match</p>
            </div>
          </a>
        </div>
      </div>
    </>
  );
}

export default SoulMateDiv;
