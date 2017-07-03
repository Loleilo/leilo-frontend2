import React from 'react'
import View from "../util/SelectView"
import {connect} from 'react-redux'
import * as groups from "../../actions/groups";
import * as user from "../../actions/user";
import {SLOW_POLL_INTERVAL} from "../../consts";
import MountSensor from "../util/MountSensor";

function GroupSelect(props) {
    return <MountSensor
        componentWillMount={props.loadGroups}
        componentWillUnmount={props.unloadGroups}
    >
        <View
            label={props.label}
            selections={props.groups.value.map((group) => {
                return {
                    value: group,
                    displayName: props.names[group].value,
                    content: <MountSensor
                        componentWillMount={() => props.loadName(group)}
                        componentWillUnmount={() => props.unloadName(group)}
                    />
                }
            })}
            selected={props}
        />
    </MountSensor>
}

function mapStateToProps(state) {
    return {
        groups: state.entities.user.groupsList,
        names: state.entities.groups.groupNames,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loadName: (groupID) => {
            dispatch(groups.pollNameStart(SLOW_POLL_INTERVAL, {group_id: groupID}))
        },
        unloadName: (groupID) => {
            dispatch(groups.pollNameStop({group_id: groupID}))
        },

        loadGroups: () => {
            dispatch(user.pollGroupsListStart(SLOW_POLL_INTERVAL))
        },
        unloadGroups: () => {
            dispatch(user.pollGroupsListStop())
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupSelect)