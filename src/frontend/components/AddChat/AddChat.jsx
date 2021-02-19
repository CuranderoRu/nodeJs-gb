import './AddChat.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { connect } from 'react-redux';
import { addChatsItem } from 'actions/chats';
import { initNewMessageArray } from 'actions/messages';


class AddChat extends Component {
    static propTypes = {
        messages: PropTypes.object,
        user: PropTypes.shape({
            login: PropTypes.string,
            nick: PropTypes.string,
            id: PropTypes.number,
        }).isRequired,
        addChatsItem: PropTypes.func.isRequired,
    }
    
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            id: null,
        };
    }

    handleChange = (event, id) => {
        switch (id) {
            case 'addchat-name':
                this.setState({
                    name: event.target.value,
                })
                break;
            case 'addchat-id':
                this.setState({
                    id: event.target.value,
                })
                break;
        }
    }

    handleSubmit = () => {
        this.props.addChatsItem({
            name: this.state.name,
            id: this.state.id,
        });
        this.props.initNewMessageArray({
            id: this.state.id,
        });
    }

    render() {
        const { user } = this.props;
        if(user.login===null){
            return null;
        }
        return (
            <form noValidate autoComplete="off" className="addchat">
                <div className="addchat-fieldcontainer">
                    <TextField required label="Имя" fullWidth = {true} onChange={(e)=>this.handleChange(e, "addchat-name")} />
                </div>
                <div className="addchat-fieldcontainer">
                    <TextField label="id чата" fullWidth = {true} onChange={(e)=>this.handleChange(e, "addchat-id")} />
                </div>
                <div className="addchat-fieldcontainer">
                    <Button onClick={this.handleSubmit}>Добавить</Button>
                </div>
            </form>
        )
    }
}

const mapStateToProps = state => (
    {
        user: state.user.user,
    }
);

const mapDispatchToProps = dispatch => (
    {
        addChatsItem: (data) => addChatsItem(dispatch, data),
        initNewMessageArray: (data) => initNewMessageArray(dispatch, data),
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(AddChat)