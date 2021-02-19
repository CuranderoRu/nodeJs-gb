import "./ChatList.scss";

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { push } from 'connected-react-router';
import { bindActionCreators } from "redux";

import { connect } from 'react-redux';

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

class ChatList extends Component {
  static propTypes = {
    chatId: PropTypes.string,
    push: PropTypes.func.isRequired,
    user: PropTypes.object,
  };

  static defaultProps = {chatId: '0'};

  constructor(props) {
    super(props);
    this.state = {
      chatId: props.chatId,
    }
  }

  handleListItemClick = (event, chatId, link) => {
    this.setState({
      chatId,
    });
    this.props.push(link);
  };

  render() {
    const { chats, user } = this.props;
    if(!user.id){
      return null;
    }
    const { chatId } = this.state;
    return (
      <div className="chat-wrapper">
        <List component="nav" aria-label="main mailbox folders">
          {chats.map((item, idx) => (
              <ListItem
                key={`item_${idx}`}
                button
                selected={item.id === chatId}
                onClick={(event) => this.handleListItemClick(event, item.id, `/chat/${item.id}`)}
              >
                <ListItemText primary={item.name} />
              </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    chats: state.chats.entities,
    user: state.user.user,
  }
);


const mapDispatchToProps = dispatch => bindActionCreators({ push }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ChatList)