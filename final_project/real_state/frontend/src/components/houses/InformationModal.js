import React, { Component, Fragment } from "react";
import Carousel from "./Carousel.js";
import RequestForm from "./RequestForm.js";
import { connect } from "react-redux";
import Save from "./Save.js";

class InformationModal extends Component {
  checkIfLiked = () => {
    var match = this.props.liked.filter(
      (house) => house.house_id === this.props.selected
    );
    
    if (localStorage.getItem('user') != null && match.length === 0)
    {
      return <Save />;
    }
  };

  render() {
    const saveButton = this.checkIfLiked();
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
                  <img
                    src="../static/images/logo.png"
                    height="50px"
                    className="mr-2"
                  />{" "}
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
                    <div
                      id="house_info"
                      style={{ maxHeight: "470px", overflowY: "scroll" }}
                    >
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
                      <p className="ml-3">
                        house ID: <span id="house_id"></span>
                      </p>
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
                      <ul id="details"></ul>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <RequestForm />
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
                {saveButton}
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.authReducer,
  liked: state.housesReducer.likedHouses,
  selected: state.housesReducer.selected,
});

export default connect(mapStateToProps)(InformationModal);
