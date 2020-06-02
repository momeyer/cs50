import React, { Component, Fragment } from "react";

class InformationModal extends Component {
  render() {
    return (
      <Fragment>
        <div
          className="modal fade"
          id="informationModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="informationModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
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
              <div className="modal-body">
                <form>
                  <div className="form-group row">
                    <div className="col-sm-7">
                      <p id="house_address">{this.props.house.address}</p>
                      <p>
                        $<span id="house_price">{this.props.house.price}</span>
                        /month
                      </p>
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
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" className="btn btn-primary">
                  Save changes
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
