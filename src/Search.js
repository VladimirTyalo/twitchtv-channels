import React, { Component } from 'react';
import { connect } from 'react-redux';

import { handleSearch } from './api';

class Search extends Component {
  handleChange() {
    const {handleSearch, predicate} = this.props;
    handleSearch(this.refs.search, predicate);
  }
  render() {
    return (
      <div className="search">
        <input
          type="text"
          className="search-input"
          value={this.props.search}
          onChange={this.handleChange.bind(this)}
          ref="search"
          id="search"
        />
        <span className="fa fa-2x fa-search icon-search"></span>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  search: state.frontend.search,
  predicate: state.frontend.filter
});

const mapDispatchToProps = dispatch => ({
  handleSearch: (inputRef, predicate) => dispatch(handleSearch(inputRef, predicate))
});



export default connect(mapStateToProps, mapDispatchToProps)(Search);