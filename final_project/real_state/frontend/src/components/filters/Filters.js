import React, { Component } from "react";
import PriceFilter from './PriceFilter.js'
import BedsFilter from "./BedsFilter.js";
import BathFilter from './BathFilter.js'
import HomeTypeFilter from './HomeTypeFilter.js'
import BuiltYearFilter from './BuiltYearFilter.js'
import SizeFilter from "./SizeFilter.js";
import SaveSearchButton from '../layout/SaveSearchButton.js'


class Filters extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg">
        <button
          className="navbar-toggler bg-danger ml-n3"
          type="button"
          data-toggle="collapse"
          data-target="#filters"
          aria-controls="filters"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span>
            <svg
              className="bi bi-funnel-fill"
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2 3.5v-2h12v2l-4.5 5v5l-3 1v-6L2 3.5z" />
              <path
                fillRule="evenodd"
                d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2h-11z"
              />
            </svg>
          </span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <ul className="navbar-nav mr-auto ml-n3 mt-2 mt-lg-0">
            <li className="nav-item">
              <PriceFilter />
            </li>
            <li className="nav-item">
              <BedsFilter />
            </li>
            <li className="nav-item">
              <BathFilter />
            </li>
            <li className="nav-item">
              <HomeTypeFilter />
            </li>
            <li className="nav-item">
              <BuiltYearFilter />
            </li>
            <li className="nav-item">
             <SizeFilter />
            </li>
            <li>
              <SaveSearchButton />
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Filters;
