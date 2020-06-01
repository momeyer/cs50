import React, { Component, Fragment } from "react";

export class Carousel extends Component {
  state = {
    imageOne: "https://picsum.photos/200",
  };
  render() {
    return (
      <Fragment>
        <div
          id="carouselExampleCaptions"
          className="carousel slide carousel-fade"
          data-ride="carousel"
        >
          <ol className="carousel-indicators">
            <li
              data-target="#carouselExampleCaptions"
              data-slide-to="0"
              className="active"
            ></li>
            <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
            <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
          </ol>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={this.state.imageOne} className="d-block w-100" />
              <div className="carousel-caption d-none d-md-block">
                <h5>First slide label</h5>
              </div>
            </div>
            <div className="carousel-item">
              <img src={this.state.imageOne} className="d-block w-100" />
              <div className="carousel-caption d-none d-md-block">
                <h5>Second slide label</h5>
              </div>
            </div>
            <div className="carousel-item">
              <img src={this.state.imageOne} className="d-block w-100" />
              <div className="carousel-caption d-none d-md-block">
                <h5>Third slide label</h5>
              </div>
            </div>
          </div>
          <a
            className="carousel-control-prev"
            href="#carouselExampleCaptions"
            role="button"
            data-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#carouselExampleCaptions"
            role="button"
            data-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </Fragment>
    );
  }
}

export default Carousel;
