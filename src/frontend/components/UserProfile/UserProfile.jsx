import './UserProfile.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { connect } from 'react-redux';
import { updateUser } from 'actions/user';

class UserProfile extends Component {
    static propTypes = {
        user: PropTypes.shape({
            login: PropTypes.string,
            nick: PropTypes.string,
            id: PropTypes.number,
        }),
        updateUser: PropTypes.func.isRequired,
    }

    static defaultProps = {}

    constructor(props) {
        super(props);
        this.state = {
            login: props.user.login,
            nick: props.user.nick,
        }
    }

    handleChange = (event, id) => {
        switch (id) {
            case 'profile-login':
                this.setState({
                    login: event.target.value,
                })
                break;
            case 'profile-nick':
                this.setState({
                    nick: event.target.value,
                })
                break;
        }
    }

    handleSubmit = () => {
        this.props.updateUser({
            login: this.state.login,
            nick: this.state.nick,
            id: this.props.user.id,
        });
    }

    render() {
        const { user } = this.props;
        if(user.login===null){
            return null;
        }
        return (
            <form noValidate autoComplete="off" className="userprofile">
                <div className="userprofile-fieldcontainer">
                    <TextField required label="Login" disabled defaultValue={user.login} fullWidth = {true} onChange={(e) => this.handleChange(e, "profile-login")} />
                </div>
                <div className="userprofile-fieldcontainer">
                    <TextField label="Nickname" defaultValue={user.nick} fullWidth = {true} onChange={(e) => this.handleChange(e, "profile-nick")} />
                </div>
                <div className="userprofile-fieldcontainer">
                    <Button onClick={this.handleSubmit}>Сохранить</Button>
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
        updateUser: (data) => updateUser(dispatch, data),
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)