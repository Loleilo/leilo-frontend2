import React from 'react'
import '../global.css'
import LoginFormConnector from "./logic/LoginFormConnector"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import MainApp from './MainApp'
import {connect} from 'react-redux'
import {LOGGED_IN} from "../reducers/states";

function App(props) {
    return (
        <MuiThemeProvider>
            {
                props.loggedIn ?
                    <MainApp/> : <LoginFormConnector/>
            }
        </MuiThemeProvider>
    );
}

export default connect((state) => {
    return {
        loggedIn: (state.entities.user.loginState.value === LOGGED_IN)
    }
})(App);