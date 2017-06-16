import AppBar from 'material-ui/AppBar'
import React from "react";
import {FlatButton} from "material-ui";

export default function (props) {
    return <AppBar
        title="Leilo"
        style={{
            position: "fixed",
            maxWidth: "100%",
            margin: "0",
            left: 0,
            top: 0,
        }}

        onLeftIconButtonTouchTap={props.onNavClick}

        iconElementRight={
            <FlatButton
                label="Logout"
                onClick={props.onLogout}
            />
        }
    />
}