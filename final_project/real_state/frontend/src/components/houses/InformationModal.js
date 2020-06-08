import React, { Component, Fragment } from "react";
import Carousel from "./Carousel.js";

class InformationModal extends Component {
  render() {
    return (
      <Fragment>
        <div
          className="modal fade "
          id="informationModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="informationModalLabel"
          aria-hidden="true"
        >
          <div
            className="modal-dialog"
            style={{ maxWidth: "90vw", marginTop: "1%" }}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="informatioModalLabel">
                  Contact this Property
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body text-dark">
                <div className="row">
                  <div className="col-md-8">
                    <div style={{ maxHeight: "470px", overflowY: "scroll" }}>
                      <div style={{ maxHeight: "300px", overflow: "hidden" }}>
                        <Carousel />
                      </div>
                      <h3 className="m-3">
                        <span className="house_address"></span>
                        <span className="house_price ml-5"></span>
                      </h3>
                      <p className="ml-3">
                        <span>
                          <img
                            src="../static/images/bed.png"
                            height="15px"
                            className="mr-2 mb-2"
                          />
                          <span id="num_bed"></span>
                        </span>
                        <span>
                          <img
                            src="../static/images/bath.png"
                            height="15px"
                            className="ml-2 mr-2 mb-2"
                          />
                          <span id="num_bath"></span>
                        </span>
                        <span>
                          <img
                            src="../static/images/size.png"
                            height="15px"
                            className="ml-2 mr-2 mb-2"
                          />
                          <span id="size"></span>
                        </span>
                      </p>
                      <h5 className="ml-3">Description:</h5>
                      <p className="m-3 text-justify">
                        Vivamus non sem libero. Proin sit amet risus tincidunt,
                        dapibus purus sed, pretium justo. Vivamus ultricies
                        ligula id diam tincidunt scelerisque. Praesent lectus
                        dui, consectetur venenatis consectetur vel, eleifend in
                        erat. Donec iaculis auctor pharetra. Quisque efficitur
                        ligula tempus, ultricies sem eget, porta ex. Maecenas
                        lacinia ut nisl at euismod. Sed nec libero ac ligula
                        vestibulum rutrum ac a libero.
                      </p>
                      <p className="m-3 text-justify">
                        Sed in nulla tempus, varius velit eget, pharetra turpis.
                        Aenean scelerisque tristique dui nec sollicitudin. Sed
                        aliquam sem vitae accumsan mattis. Aliquam porttitor leo
                        et nunc posuere rutrum. Suspendisse dolor nibh, ornare
                        at ligula ac, venenatis vehicula nisl. Nam magna purus,
                        semper ac lectus et, sollicitudin condimentum velit.
                        Nulla accumsan mi eu velit tempor aliquam. Nam neque
                        mauris, fringilla non bibendum non, consequat ac arcu.
                        Nullam laoreet, massa eleifend rhoncus viverra, lectus
                        diam ultricies enim, sed volutpat lacus metus ac nisl.
                        Pellentesque et orci egestas, finibus mi non, tincidunt
                        dui.
                      </p>
                      <h5 className="ml-3">
                        Details for <span className="house_address"></span>
                      </h5>
                      <ul id="details">
                        
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <form>
                      <div className="form-group row">
                        <div className="col-sm-12 mt-5">
                          <p className="house_address"></p>
                          <p className="house_price"></p>
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="col-sm-12">
                          <input
                            type="email"
                            className="form-control"
                            id="inputEmail"
                            placeholder="Your email "
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="col-sm-12">
                          <input
                            type="name"
                            className="form-control"
                            id="inputName"
                            placeholder="Your name"
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="col-sm-12">
                          <textarea
                            type="request"
                            className="form-control"
                            id="inputRequest"
                            placeholder="Let us know what information you are looking for."
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        className="btn btn-outline-primary"
                        style={{ borderRadius: "5px" }}
                      >
                        send
                      </button>
                    </form>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  data-dismiss="modal"
                  style={{ borderRadius: "5px" }}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  style={{ borderRadius: "5px" }}
                >
                  <svg
                    className="bi bi-heart-fill mr-2"
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                    />
                  </svg>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default InformationModal;
