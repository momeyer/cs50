import React, { Component, Fragment } from "react";

export class Carousel extends Component {
  generateDivPics(houseId, numberOfPics) {
    const divElements = [''];
    for (var i = 1; i < numberOfPics; i++) {
      divElements.push(
        <div key={`house_${houseId}_pic_${i}`} className="carousel-item">
          <img src={`../static/images/House${i}.jpg`} className="d-block w-100" style={{maxHeight:'112px', borderTopLeftRadius: "10px",
                  borderTopRightRadius: "10px"}} />
          <div className="carousel-caption d-none d-md-block">
            <h5>
              {i + 1} of {numberOfPics}
            </h5>
          </div>
        </div>
      );
    }
    return divElements;
  }

  render() {
    var numberOfPics = 5;
    const picElements = this.generateDivPics(this.props.houseId, numberOfPics);

    return (
      <Fragment>
        <div
          id={`house_card_id_${this.props.houseId}`}
          className="carousel slide carousel-fade"
          data-ride="carousel"
        >
          <div className="carousel-inner">
            <div
              key={`house_${this.props.houseId}_pic_0`}
              className="carousel-item active"
            >
              <img
                style={{
                  borderTopLeftRadius: "10px",
                  borderTopRightRadius: "10px",
                }}
                src="../static/images/House.jpg"
                className="d-block w-100"
              />
              <div className="carousel-caption d-none d-md-block">
                <h5> 1 of {numberOfPics}</h5>
              </div>
            </div>
            {picElements}
          </div>
          <a
            className="carousel-control-prev"
            href={`#house_card_id_${this.props.houseId}`}
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
            href={`#house_card_id_${this.props.houseId}`}
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
