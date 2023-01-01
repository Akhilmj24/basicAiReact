import React, { useState } from "react";
import "./navBar.scss";
import { NavMenus } from "./NavMenus";
import { Link, useLocation } from "react-router-dom";

export default function NavBar() {
  const { pathname } = useLocation();
  const [toggleBtnNav, settoggleBtnNav] = useState(false);
  return (
    <nav className="navbar navbar-expand-lg navbar-light mt-md-2 mb-md-2 me-md-5 ms-md-5 ">
      <div className="container-fluid navbarres">
        <div className="navlogoSection">
          <h2 className="navbar-brand" href="/">
            myAi
          </h2>
          <button
            className="navbar-togglercus"
            type="button"
            onClick={() => settoggleBtnNav(!toggleBtnNav)}
          >
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>
        {/* navbar-collapse d-felx flex-row-reverse collapse show */}
        <div
          className={`${
            toggleBtnNav ? `listofmenuShow` : `listofmenu`
          }  d-felx flex-row-reverse`}
        >
          <ul className="navbar-nav mb-2 me-5 mb-lg-0">
            {NavMenus.map((menu) => (
              <li className="nav-item" key={menu.name}>
                <Link
                  className={`nav-link ${
                    menu.location === pathname ? `activeMenu` : ``
                  } `}
                  to={menu.location}
                >
                  {menu.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
