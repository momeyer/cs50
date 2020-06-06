import React, { Component } from "react";
import CheckboxDropDown from './CheckboxDropDown.js'
import SaveSearchButton from "../layout/SaveSearchButton.js";
import RadioDropDown from "./RadioDropDown.js";

class Filters extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg ">
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
        <div className="collapse navbar-collapse" id="filters">
          <ul className="navbar-nav mr-auto ml-n2 mt-2 mt-lg-0">
            <li className="nav-item">
              <RadioDropDown
                type="price"
                options={[
                  "up to US$ ",
                  "up to US$ ",
                  "up to US$ ",
                  "up to US$ ",
                  "up to US$ ",
                ]}
                values={[500, 1000, 1500, 2000, 2500, 3000]}
                title="Price"
              />
            </li>
            <li className="nav-item">
              <RadioDropDown
                type="bed"
                options={[
                  "studio+",
                  "1+ Beds",
                  "2+ Beds",
                  "3+ Beds",
                  "4+ Beds",
                ]}
                values={[0, 1, 2, 3, 4]}
                title="Beds"
              />
            </li>
            <li className="nav-item">
              <RadioDropDown
                type="bath"
                options={[
                  "No Preference",
                  "1+ Baths",
                  "2+ Baths",
                  "3+ Baths",
                  "4+ Baths",
                ]}
                values={[0, 1, 2, 3, 4]}
                title="Bath"
              />
            </li>
            <li className="nav-item"></li>
            <li className="nav-item"></li>
            <li className="nav-item">
              <CheckboxDropDown options={['House', 'Apartment',]} title="Home Type" />
            </li>
            <li className="nav-item">
              <RadioDropDown
                type="built"
                options={["1900+", "2000+", "2010+", "2015+", "2020+"]}
                values={[1900, 2000, 2010, 2015, 2020]}
                title="Year"
              />
            </li>
            <li className="nav-item">
              <RadioDropDown
                type="size"
                options={[
                  "40+ m2",
                  "50+ m2",
                  "60+ m2",
                  "70+ m2",
                  "80+ m2",
                  "90+ m2",
                  "100+ m2",
                ]}
                values={[40, 50, 60, 70, 80, 90, 100]}
                title="Size"
              />
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
