import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';

import { ChannelItem } from './ChannelItem';

class Channels extends Component {
  makeChannelItem(ch) {
    return (
      <ChannelItem 
        key={uuid.v4()}
        ch={ch}
        logo={ch.logo}
        name={ch.display_name}
        url={ch.url}
        streams={this.props.streams}
        query={this.props.query}
      />
    );
  }
  render() {
    return (
      <ul className="channels">
        {this.props.channels.map(this.makeChannelItem.bind(this))}
      </ul>
    );
  }
}


const mapStateToProps = (state) =>{
  return {
    channels: state.frontend.channels.map(key => state.channels[key]).filter(ch => ch !== undefined),
    streams: state.streams,
    query: state.frontend.search
};
};

export default connect(mapStateToProps)(Channels);