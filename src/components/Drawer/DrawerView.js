import React from 'react'
import Drawer from "material-ui/Drawer";
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider'
import PropTypes from 'prop-types'
import DashboardIcon from 'material-ui-icons/Dashboard'
import MountSensor from "../util/MountSensor";

function DrawerView(props) {
    return <Drawer open={props.open}
                   docked={false}
                   onRequestChange={props.onOpenChange}
    >
        <List>
            <ListItem disabled={true}><h2>Leilo</h2></ListItem>
            <ListItem primaryText="Dashboard" leftIcon={<DashboardIcon/>} onTouchTap={props.dashboard.onClick}/>
            <Divider/>
            <ListItem onTouchTap={props.groups.onClick}><strong>Devices</strong></ListItem>
            <MountSensor
                componentWillMount={props.groups.onMount}
                componentWillUnmount={props.groups.onUnmount}
            >
                <div>
                    {props.groups.value && props.groups.value.map((group) => {
                        return <ListItem key={group.key} onTouchTap={group.onClick}>
                            {group.content}
                        </ListItem>
                    })}
                </div>
            </MountSensor>
        </List>
    </Drawer>
}

DrawerView.propTypes = {
    open: PropTypes.bool.isRequired,
    onOpenChange: PropTypes.func,
};

export default DrawerView;