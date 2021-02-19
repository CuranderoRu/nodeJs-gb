import "./Menu.scss";

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { push } from 'connected-react-router';
import { bindActionCreators } from "redux";

import { connect } from 'react-redux';

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

class Menu extends Component {
  static propTypes = {
    chapterId: PropTypes.string,
    menu: PropTypes.array,
    push: PropTypes.func.isRequired,
    user: PropTypes.object,
  };

  static defaultProps = {chapterId: 'lesson3'};

  constructor(props) {
    super(props);
    this.state = {
      chapterId: props.chapterId,
    }
  }

  handleListItemClick = (event, chapterId) => {
    this.setState({
      chapterId,
    });
    this.props.push(chapterId);
  };

  render() {
    const { menu, user } = this.props;
    if(user.id){
      return null;
    }
    const { chapterId } = this.state;
    return (
      <div className="chat-wrapper">
        <List component="nav" aria-label="menu chapters">
          {menu.map((item, idx) => (
              <ListItem
                key={`menuitem_${idx}`}
                button
                selected={item.href === chapterId}
                onClick={(event) => this.handleListItemClick(event, item.href)}
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
    menu: state.menu.entities,
    user: state.user.user,
  }
);


const mapDispatchToProps = dispatch => bindActionCreators({ push }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Menu)