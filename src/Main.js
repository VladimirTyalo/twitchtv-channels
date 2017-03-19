import React, { Component } from 'react';
import { connect } from 'react-redux';

import Search from './Search';
import Channels from './Channels';
import {create} from './actions';

class Main extends Component {

  handleMenuClick(predicate) {
    this.props.menuClick(predicate);
  }
  render() {
    function activeNavClass(filter) {
      return (
        this.props.filter.toLowerCase() === filter.toLowerCase()
          ? 'nav-item nav-item--active'
          : 'nav-item');
    }

    return (
      <main className="main">
        <nav className="nav">
          <ul className="nav-items">
            <li className={activeNavClass.call(this, "all")}
              onClick={this.handleMenuClick.bind(this, "all")}
            >All</li>
            <li className={activeNavClass.call(this, "online")}
              onClick={this.handleMenuClick.bind(this, "online")}
            >Online</li>
            <li className={activeNavClass.call(this, "offline")}
              onClick={this.handleMenuClick.bind(this, "offline")}
            >Offline</li>
          </ul>
          <Search />
        </nav>
        <Channels channels={this.props.filteredChannels} />
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  filteredChannels: state.frontend.channels.map(ch => state.channels[ch]),
  filter: state.frontend.filter
});

const mapDispatchToProps = (dispatch) => ({
  menuClick: (predicate) => dispatch(create.filter(predicate))
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);