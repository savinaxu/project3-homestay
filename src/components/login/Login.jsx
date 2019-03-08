import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from  'react-router-dom';
import * as actions from 'actions';

class Login extends Component {
    constructor() {
        super()
        this.loginUser = this.loginUser.bind(this)
    }

    loginUser(userData) {
        this.props.dispatch(actions.login(userData));
    }
}

function mapStateToProps(state) {
    return {
      auth: state.auth
    }
}

export default connect(mapStateToProps)(Login)