import React, { Component } from "react";
import { connect } from "react-redux";
import { saveHouse } from '../../actions/houses.js'


class Save extends Component {
  saveHouse = () => {
    const ids = {
      user_id: this.props.auth.user.id,
      house_id: this.props.selected
    }

    this.props.saveHouse( ids )
    
    document.location.reload()
  };

  render() {
    return (
      <button
        onClick={this.saveHouse}
        type="button"
        className="btn btn-outline-danger"
        style={{ borderRadius: "5px" }}
        data-dismiss="modal"
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
    );
  }
}

const mapStateToProps = (state) => ({
  selected: state.housesReducer.selected,
  auth: state.authReducer
});

const mapDispatchToProps = {
  saveHouse: saveHouse,
};


export default connect(mapStateToProps, mapDispatchToProps)(Save);
