import styles from './MessageStyle.js';
    
import React, { Component } from 'react';
import PropTypes from 'prop-types';
    
export default class Message extends Component {
    static propTypes = {
        author: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
        user: PropTypes.shape({
            login: PropTypes.string.isRequired,
            id: PropTypes.number.isRequired,
        }),
    }

    constructor(props){
        super(props);
    }

    render(){
        const {author, message, user} = this.props;
        return(
            <div style={{...styles.message, alignSelf: author === 'me' ? 'flex-start' : 'flex-end'}}>
                <p style={{...styles.messageText}}>{message}</p>
                <p>{author === 'me' ? user.nick : author}</p>
            </div>
        )
    }
}