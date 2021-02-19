import './MessageList.scss';

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import Message from '../Message/Message'
import SendMessage from '../SendMessage/SendMessage'

import { connect } from 'react-redux';
import { addMessageItem } from 'actions/messages';


class MessageList extends Component {
    static propTypes = {
        messages: PropTypes.object.isRequired,
        user: PropTypes.shape({
            login: PropTypes.string,
            nick: PropTypes.string,
            id: PropTypes.number,
        }),
        chatId: PropTypes.string,
        onDisplay: PropTypes.func.isRequired,
    }

    static defaultProps = {
        chatId: null,
    }

    constructor(props) {
        super(props);
    }

    componentDidMount(){
        this.props.onDisplay(this.props.chatId);
    }

    handleSubmit = (comment, chatId) => {
        this.props.addMessageItem({ comment, chatId });
    }

    render() {
        const { messages, user, chatId } = this.props;
        if (user.login === null || typeof messages[chatId] === 'undefined') {
            return null;
        }
        return (
            <Fragment>
                <SendMessage chatId={chatId} onSubmit={this.handleSubmit} user={user} />
                <div className="messages">
                    {
                        messages[chatId].map((comment, idx) =>
                            <Message key={idx} {...comment} user={user} />
                        )}
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => (
    {
        user: state.user.user,
        messages: state.messages.entities,
    }
);

const mapDispatchToProps = dispatch => (
    {
        addMessageItem: (item) => addMessageItem(dispatch, item),
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(MessageList)