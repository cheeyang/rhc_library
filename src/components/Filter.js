import React, { Component } from "react";
import Select from "react-select";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { updateFilteredBooks } from "containers/Browse/actions";
import { bindActionCreators } from "redux";
import { Button, Icon } from "antd";
import "./Filter.css";

const selectStyles = {
  valueContainer: presets => ({ ...presets, padding: 2, height: 20 }),
  menu: presets => ({ ...presets }),
  menuPortal: presets => ({ ...presets, fontSize: 12 }),
  dropdownIndicator: presets => ({ ...presets, width: 25 }),
  //override minHeight in control
  control: presets => ({ ...presets, height: 30, minHeight: 30 })
};

const availabilityOptions = [
  { value: "all", label: "All Books" },
  { value: "available", label: "Available Books" },
  { value: "borrowed", label: "Borrowed Books" }
];

const sortOptions = [
  { value: "title", label: "Title" },
  { value: "author", label: "Author" },
  { value: "dateAdded", label: "Date Added" },
  { value: "popularity", label: "Most Popular" }
];

class Filter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      availability: { value: "all", label: "All Books" },
      sortBy: { value: "title", label: "Title" }
    };
  }

  componentDidMount() {
    this._filterBooks();
  }

  _toggleFilterModal = () => {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  };
  _updateAvailability = selectedOption => {
    this.setState(
      { availability: selectedOption, showModal: false },
      this._filterBooks
    );
  };
  _updateSort = selectedOption => {
    this.setState({ sortBy: selectedOption, showModal: false });
  };
  _filterBooks = () => {
    let filteredBooks = [];
    console.log(
      "availability when component did mount  --  ",
      this.state.availability.value
    );
    console.log("all books: ", this.props.allBooks);
    switch (this.state.availability.value) {
      case "available":
        filteredBooks = this.props.allBooks.filter(
          book => book.loanData === null
        );
        break;
      case "all":
        filteredBooks = this.props.allBooks;
        break;
      case "borrowed":
        filteredBooks = this.props.allBooks.filter(
          book => book.loanData !== null
        );
        break;
      default:
        break;
    }
    console.log("updating filtered books...  ", filteredBooks);
    this.props.updateFilteredBooks(filteredBooks);
  };
  render() {
    return (
      <div className="Filter">
        {this.props.location.pathname === "/browse" && (
          <div className="filterWrapper">
            {!this.state.showModal ? (
              <Button
                className="filterButton"
                type="primary"
                size={"large"}
                onClick={this._toggleFilterModal}
              >
                <Icon className="filterIcon" type="filter" />
              </Button>
            ) : null}
            <div
              className={`filterBody ${this.state.showModal ? "show" : "hide"}`}
            >
              <label htmlFor="availability">Availability:</label>
              <label htmlFor="sort">Sort By:</label>
              <div />
              <Select
                className="reactSelect"
                value={this.state.availability}
                name="availability"
                placeholder="Select"
                menuPortalTarget={document.body}
                options={availabilityOptions}
                styles={selectStyles}
                onChange={this._updateAvailability}
              />
              <Select
                className="reactSelect"
                value={this.state.sortBy}
                name="sort"
                placeholder="Select"
                menuPortalTarget={document.body}
                options={sortOptions}
                styles={selectStyles}
                onChange={this._updateSort}
              />
              <Icon className="sortIcon" type="rise" />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(
  connect(
    ({ browse: { allBooks, filteredBooks } }) => ({ allBooks, filteredBooks }),
    dispatch => bindActionCreators({ updateFilteredBooks }, dispatch)
  )(Filter)
);
