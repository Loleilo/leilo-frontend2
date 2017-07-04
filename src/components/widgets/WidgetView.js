import React from 'react'
import Delete from 'material-ui-icons/Delete'
import Settings from 'material-ui-icons/Settings'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

import {ContextMenu, ContextMenuTrigger} from 'react-contextmenu'

function WidgetView(props) {
    return <ContextMenuTrigger id={props.menuID}>
        {props.lineColor && <div style={{
            backgroundColor: props.lineColor,
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            width: '3px',
        }}/>}
        {props.children}
        <ContextMenu id={props.menuID} className="cancel-drag" style={{
            position: "absolute",
            top: 0,
            left: 0,
        }}>
            <Paper >
                <Menu >
                    <MenuItem
                        primaryText="Configure"
                        leftIcon={<Settings/>}
                        onTouchTap={props.onSettingsClicked}
                    />
                    <MenuItem
                        primaryText="Delete"
                        leftIcon={<Delete/>}
                        onClick={props.onDeleteClicked}
                    />
                </Menu>
            </Paper>
        </ContextMenu>
    </ContextMenuTrigger>
}

WidgetView.propTypes = {
    onDeleteClicked: PropTypes.func,
    onSettingsClicked: PropTypes.func,
    lineColor: PropTypes.string,
    menuID: PropTypes.string,
};

export default WidgetView