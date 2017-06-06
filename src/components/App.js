import React from 'react'
import '../global.css'
import LoginFormConnector from "./logic/LoginFormConnector";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends React.Component {
    render() {
        return (
            <MuiThemeProvider>
                <LoginFormConnector/>
            </MuiThemeProvider>
        );
    }
}

export default App
