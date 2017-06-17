import AppBar from 'material-ui/AppBar'
import React from "react";
import {FlatButton} from "material-ui";
import PropTypes from 'prop-types'

function AppBarView(props) {
    return <AppBar
        title="Leilo"
        docked={false}
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

AppBarView.propTypes={
    onNavClick: PropTypes.func,
    onLogout: PropTypes.func,
};

export default AppBarView;