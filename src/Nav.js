import React, { useEffect, useState } from "react";
import "./Nav.css";

function Nav() {
  const [show, handleShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);

  return (
    <div className={`nav ${show && "nav__black"}`}>
      <img
        className="nav__logo"
        src="https://about.netflix.com/images/logo.png"
        alt="Netflix Logo"
      ></img>

      <img
        className="nav__avatar"
        src="data:image/png;base64,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"
        alt="Netflix Logo"
      ></img>
    </div>
  );
}

export default Nav;
