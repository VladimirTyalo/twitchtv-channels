import React, { Component } from 'react';

const EMPTY_AVATAR = "http://www.harrogatehealthandbeauty.com/existing-site/img/photo/avatar-empty.png";

export class ChannelItem extends Component {

  isAlive() {
    const chId = this.props.ch._id;
    return this.props.streams[chId] !== undefined;
  }

  viewers() {
    const chId = this.props.ch._id;
    const stream = this.props.streams[chId];
    return stream && stream.viewers;
  }

  game() {
    const chId = this.props.ch._id;
    const stream = this.props.streams[chId];
    return stream && stream.game;
  }

  streamInfo() {
    if (this.isAlive()) {
      return (
        <div className="stream-info">
          <span className="channel-viewers">
            <i className="fa fa-eye"></i>
            {this.viewers()}
          </span>
          <span className="channel-game">{this.game()}</span>
        </div>
      );
    }
    return (<div></div>);
  }

  linkClass() {
    return this.props.name.toLowerCase() === this.props.query.toLowerCase().trim()
      ? "channel-link channel-exact-match"
      : "channel-link";
  }

  linkClassName() {
    const query = this.props.query ? this.props.query.toLowerCase() : "";
    return this.props.name.toLowerCase() === query
      ? "channel-link channel-exact-match"
      : "channel-link";
  }
  render() {
    return (
      <li className="channel-item">
        <a href={this.props.url} target="_blank"
          className={
            this.props.name.toLowerCase() === this.props.query.toLowerCase()
              ? "channel-link channel-exact-match"
              : "channel-link"
          }>
          <img src={this.props.logo || EMPTY_AVATAR} className="channel-avatar"
            alt="avatar" />
          <div className="channel-description">
            <div className="channel-name">
              {this.props.name}
            </div>
            {this.streamInfo()}
          </div>
          {this.isAlive()
            ? <div className="channel-status fa fa-check" ></div>
            : <div className="channel-status fa fa-ban"></div>
          }
        </a>
      </li>
    );
  }
}


export default ChannelItem;