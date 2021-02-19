import './Header.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

import { connect } from 'react-redux';

class Header extends Component {
    static propTypes = {
        user: PropTypes.shape({
            login: PropTypes.string,
            nick: PropTypes.string,
            id: PropTypes.number,
        }).isRequired,
    }

    
    constructor(props) {
        super(props);
    }

    render() {
        const { user } = this.props;
        if (user.login === null) {
            return null;
        }
        return (
            <header className="header">
                <Link to="/profile">{user.nick}</Link>
                <Link to="/addchat">Новый чат</Link>
            </header>
        )
    }
}

const mapStateToProps = state => (
    {
        user: state.user.user,
    }
);


export default connect(mapStateToProps)(Header)