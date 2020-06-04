import React, { Component } from "react";

class Filters extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <div className="dropdown mr-2 mt-3">
                <button
                  className="btn btn-outline-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenu2"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span>
                    <img
                      src="../static/images/price.png"
                      height="15px"
                      style={{ marginBottom: "7px", marginRight: "5px", border:'none !important'}}
                    />
                    Any Price
                  </span>
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                  <button className="dropdown-item" type="button">
                    $100 - $500
                  </button>
                  <button className="dropdown-item" type="button">
                    $500 - $1000
                  </button>
                  <button className="dropdown-item" type="button">
                    $1000 - $1500
                  </button>
                  <button className="dropdown-item" type="button">
                    $1500 - And Up
                  </button>
                </div>
              </div>
            </li>
            <li className="nav-item">
             <div className="dropdown mr-2 mt-3">
         <button
            className="btn btn-outline-secondary dropdown-toggle"
            type="button"
            id="dropdownMenu2"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span>
              <img
                src="../static/images/price.png"
                height="15px"
                style={{ marginBottom: "7px", marginRight: "5px" }}
              />
              Any Price
            </span>
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
            <button className="dropdown-item" type="button">
              $100 - $500
            </button>
            <button className="dropdown-item" type="button">
              $500 - $1000
            </button>
            <button className="dropdown-item" type="button">
              $1000 - $1500
            </button>
            <button className="dropdown-item" type="button">
              $1500 - And Up
            </button>
          </div>
        </div>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Pricing
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Dropdown link
              </a>
              <div
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <a className="dropdown-item" href="#">
                  Action
                </a>
                <a className="dropdown-item" href="#">
                  Another action
                </a>
                <a className="dropdown-item" href="#">
                  Something else here
                </a>
              </div>
            </li>
          </ul>
        </div>
      </nav>

      // <div className="btn-group">
      //   <div className="dropdown mr-2 mt-3">
      //     <button
      //       className="btn btn-outline-secondary dropdown-toggle"
      //       type="button"
      //       id="dropdownMenu2"
      //       data-toggle="dropdown"
      //       aria-haspopup="true"
      //       aria-expanded="false"
      //     >
      //       <span>
      //         <img
      //           src="../static/images/price.png"
      //           height="15px"
      //           style={{ marginBottom: "7px", marginRight: "5px" }}
      //         />
      //         Any Price
      //       </span>
      //     </button>
      //     <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
      //       <button className="dropdown-item" type="button">
      //         $100 - $500
      //       </button>
      //       <button className="dropdown-item" type="button">
      //         $500 - $1000
      //       </button>
      //       <button className="dropdown-item" type="button">
      //         $1000 - $1500
      //       </button>
      //       <button className="dropdown-item" type="button">
      //         $1500 - And Up
      //       </button>
      //     </div>
      //   </div>
      //   <div className="dropdown mr-2 mt-3">
      //     <button
      //       className="btn btn-outline-secondary dropdown-toggle"
      //       type="button"
      //       id="dropdownMenu2"
      //       data-toggle="dropdown"
      //       aria-haspopup="true"
      //       aria-expanded="false"
      //     >
      //       <span>
      //         <img
      //           src="../static/images/bed.png"
      //           height="15px"
      //           style={{ marginBottom: "7px", marginRight: "5px" }}
      //         />
      //         N. of Beds
      //       </span>
      //     </button>
      //     <div className="dropdown-menu p-4">
      //       <div className="form-group">
      //         <div className="form-check">
      //           <input
      //             type="checkbox"
      //             className="form-check-input"
      //             id="dropdownCheck2"
      //           />
      //           <label className="form-check-label" htmlFor="dropdownCheck2">
      //             studio
      //           </label>
      //         </div>
      //       </div>
      //       <div className="form-group">
      //         <div className="form-check">
      //           <input
      //             type="checkbox"
      //             className="form-check-input"
      //             id="dropdownCheck2"
      //           />
      //           <label className="form-check-label" htmlFor="dropdownCheck2">
      //             1 Bed
      //           </label>
      //         </div>
      //       </div>
      //       <div className="form-group">
      //         <div className="form-check">
      //           <input
      //             type="checkbox"
      //             className="form-check-input"
      //             id="dropdownCheck2"
      //           />
      //           <label className="form-check-label" htmlFor="dropdownCheck2">
      //             2 Beds
      //           </label>
      //         </div>
      //       </div>
      //       <div className="form-group">
      //         <div className="form-check">
      //           <input
      //             type="checkbox"
      //             className="form-check-input"
      //             id="dropdownCheck2"
      //           />
      //           <label className="form-check-label" htmlFor="dropdownCheck2">
      //             3+ Beds
      //           </label>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      //   <div className="dropdown mr-2 mt-3">
      //     <button
      //       className="btn btn-outline-secondary dropdown-toggle"
      //       type="button"
      //       id="dropdownMenu2"
      //       data-toggle="dropdown"
      //       aria-haspopup="true"
      //       aria-expanded="false"
      //     >
      //       <span>
      //         <img
      //           src="../static/images/bath.png"
      //           height="15px"
      //           style={{ marginBottom: "7px", marginRight: "5px" }}
      //         />
      //         N. of Baths
      //       </span>
      //     </button>
      //     <div className="dropdown-menu p-4">
      //       <div className="form-group">
      //         <div className="form-check">
      //           <input
      //             type="checkbox"
      //             className="form-check-input"
      //             id="dropdownCheck2"
      //           />
      //           <label className="form-check-label" htmlFor="dropdownCheck2">
      //             1 Bathroom
      //           </label>
      //         </div>
      //       </div>
      //       <div className="form-group">
      //         <div className="form-check">
      //           <input
      //             type="checkbox"
      //             className="form-check-input"
      //             id="dropdownCheck2"
      //           />
      //           <label className="form-check-label" htmlFor="dropdownCheck2">
      //             2+ Baths
      //           </label>
      //         </div>
      //       </div>
      //       <div className="form-group">
      //         <div className="form-check">
      //           <input
      //             type="checkbox"
      //             className="form-check-input"
      //             id="dropdownCheck2"
      //           />
      //           <label className="form-check-label" htmlFor="dropdownCheck2">
      //             3+ Baths
      //           </label>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      //   <div className="dropdown mr-2 mt-3">
      //     <button
      //       className="btn btn-outline-secondary dropdown-toggle"
      //       type="button"
      //       id="dropdownMenu2"
      //       data-toggle="dropdown"
      //       aria-haspopup="true"
      //       aria-expanded="false"
      //     >
      //       <span>
      //         <img
      //           src="../static/images/houseType.png"
      //           height="15px"
      //           style={{ marginBottom: "7px", marginRight: "5px" }}
      //         />
      //         Home Type
      //       </span>
      //     </button>
      //     <div className="dropdown-menu p-4">
      //       <div className="form-group">
      //         <div className="form-check">
      //           <input
      //             type="checkbox"
      //             className="form-check-input"
      //             id="dropdownCheck2"
      //           />
      //           <label className="form-check-label" htmlFor="dropdownCheck2">
      //             Home
      //           </label>
      //         </div>
      //       </div>
      //       <div className="form-group">
      //         <div className="form-check">
      //           <input
      //             type="checkbox"
      //             className="form-check-input"
      //             id="dropdownCheck2"
      //           />
      //           <label className="form-check-label" htmlFor="dropdownCheck2">
      //             Apartment
      //           </label>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      //   <div className="dropdown mr-2 mt-3">
      //     <button
      //       className="btn btn-outline-secondary dropdown-toggle"
      //       type="button"
      //       id="dropdownMenu2"
      //       data-toggle="dropdown"
      //       aria-haspopup="true"
      //       aria-expanded="false"
      //     >
      //       <span>
      //         <img
      //           src="../static/images/built.png"
      //           height="15px"
      //           style={{ marginBottom: "7px", marginRight: "5px" }}
      //         />
      //         Built Year
      //       </span>
      //     </button>
      //     <div className="dropdown-menu p-4">
      //       <div className="form-group">
      //         <div className="form-check">
      //           <input
      //             type="checkbox"
      //             className="form-check-input"
      //             id="dropdownCheck2"
      //           />
      //           <label className="form-check-label" htmlFor="dropdownCheck2">
      //             2000+
      //           </label>
      //         </div>
      //       </div>
      //       <div className="form-group">
      //         <div className="form-check">
      //           <input
      //             type="checkbox"
      //             className="form-check-input"
      //             id="dropdownCheck2"
      //           />
      //           <label className="form-check-label" htmlFor="dropdownCheck2">
      //             2015+
      //           </label>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      //   <div className="dropdown mr-2 mt-3">
      //     <button
      //       className="btn btn-outline-secondary dropdown-toggle"
      //       type="button"
      //       id="dropdownMenu2"
      //       data-toggle="dropdown"
      //       aria-haspopup="true"
      //       aria-expanded="false"
      //     >
      //       <span>
      //         <img
      //           src="../static/images/size.png"
      //           height="15px"
      //           style={{ marginBottom: "7px", marginRight: "5px" }}
      //         />
      //         Size
      //       </span>
      //     </button>
      //     <div className="dropdown-menu p-4">
      //       <div className="form-group">
      //         <div className="form-check">
      //           <input
      //             type="checkbox"
      //             className="form-check-input"
      //             id="dropdownCheck2"
      //           />
      //           <label className="form-check-label" htmlFor="dropdownCheck2">
      //             40+ m2
      //           </label>
      //         </div>
      //       </div>
      //       <div className="form-group">
      //         <div className="form-check">
      //           <input
      //             type="checkbox"
      //             className="form-check-input"
      //             id="dropdownCheck2"
      //           />
      //           <label className="form-check-label" htmlFor="dropdownCheck2">
      //             50+ m2
      //           </label>
      //         </div>
      //       </div>
      //       <div className="form-group">
      //         <div className="form-check">
      //           <input
      //             type="checkbox"
      //             className="form-check-input"
      //             id="dropdownCheck2"
      //           />
      //           <label className="form-check-label" htmlFor="dropdownCheck2">
      //             70+ m2
      //           </label>
      //         </div>
      //       </div>
      //       <div className="form-group">
      //         <div className="form-check">
      //           <input
      //             type="checkbox"
      //             className="form-check-input"
      //             id="dropdownCheck2"
      //           />
      //           <label className="form-check-label" htmlFor="dropdownCheck2">
      //             80+ m2
      //           </label>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // </div>
    );
  }
}

export default Filters;
