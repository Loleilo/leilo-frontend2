import LoginForm from './LoginForm';
import {connect} from 'react-redux';
import {login} from "../../actions/user";
import * as ErrCodes from "../../consts";
import {Component} from 'react'
import React from 'react'
import {LOGGING_IN} from "../../reducers/states";

function mapStateToProps(state) {
    const loginState = state.entities.user.loginState;
    const loading=(loginState.value === LOGGING_IN);
    const resProps = {
        errors: {
            username: null,
            password: null,
            general: null
        },
        loading: loading,
    };
    const lastErr = loginState.lastError;
    if (lastErr) {
        switch (lastErr.errorCode) {
            case ErrCodes.ERR_INVALID_LOGIN:
                resProps.errors.password = "Wrong password";
                break;
            case ErrCodes.ERR_ENTITY_NONEXISTENT:
                resProps.errors.username = "Invalid username";
                break;
            default:
                resProps.errors.general = lastErr.toString();
        }
    }
    return resProps;
}

function mapDispatchToProps(dispatch) {
    return {
        login: (credentials) => dispatch(login(credentials))
    };
}

class LoginFormConnector extends Component {
    constructor(props) {
        super(props);

        this.state = {
            credentials: {
                username: "",
                password: ""
            }
        };

        this.processSubmit = this.processSubmit.bind(this);
        this.processChange = this.processChange.bind(this);
    }

    processSubmit(event) {
        event.preventDefault();
        this.props.login(this.state.credentials);
    }

    processChange(event) {
        const field = event.target.name;
        const credentials = this.state.credentials;
        credentials[field] = event.target.value;
        this.setState({
            credentials
        });
    }

    render() {
        return <LoginForm
            onSubmit={this.processSubmit}
            onChange={this.processChange}
            errors={this.props.errors}
            credentials={this.state.credentials}
            loading={this.props.loading}
        />
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(LoginFormConnector)

