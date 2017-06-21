import React from 'react'
import '../global.css'
import LoginFormConnector from "./logic/LoginFormConnector"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import MainApp from './MainApp'
import {connect} from 'react-redux'
import {LOGGED_IN} from "../reducers/states";
import MountSensor from "./logic/MountSensor";
import * as user from '../actions/user';
import {SLOW_POLL_INTERVAL} from "../consts";
import {BrowserRouter, withRouter} from "react-router-dom";

function App(props) {
    return (
        <BrowserRouter>
            <MuiThemeProvider>
                <MountSensor componentWillMount={props.loadLoginState} componentWillUnmount={props.unloadLoginState}>
                    {
                        props.loggedIn ?
                            <MainApp history={props.history}/> : <LoginFormConnector/>
                    }
                </MountSensor>
            </MuiThemeProvider>
        </BrowserRouter>
    );
}

function mapStateDispatch(dispatch) {
    return {
        loadLoginState: () => {
            dispatch(user.pollLoginStateStart(SLOW_POLL_INTERVAL))
        },
        unloadLoginState: () => {
            dispatch(user.pollLoginStateStop())
        },
    }
}

export default connect((state) => {
    return {
        loggedIn: (state.entities.user.loginState.value === LOGGED_IN)
    }
}, mapStateDispatch)(App);