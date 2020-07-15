import React, { Component } from "react";
import Style from "./Navbar.module.scss";
import { NavLink } from "react-router-dom";
class Navbar extends Component {
  render() {
    return (
      <main>
        <nav role="navigation" className={Style.navbar}>
          <div className={Style.title}>
            <h1 aria-level="1">Pro-Organizer</h1>
          </div>
          <ul className={Style.lists}>
            <li className={Style.list1}>
              <NavLink
                role="link"
                to="/"
                exact
                className={Style.links}
                activeClassName={Style.activenavigation}
              >
                Home
              </NavLink>
            </li>

            <li className={Style.list2}>
              {" "}
              <NavLink
                role="link"
                to="/createboard"
                activeClassName={Style.activenavigation}
                className={Style.links}
              >
                Create a Board
              </NavLink>
            </li>

            <li className={Style.list3}>
              {" "}
              <NavLink
                role="link"
                className={Style.links}
                to="/signup"
                className={Style.links}
                activeClassName={Style.activenavigation}
              >
                Sign In{" "}
              </NavLink>
            </li>
          </ul>
        </nav>
      </main>
    );
  }
}

export default Navbar;
