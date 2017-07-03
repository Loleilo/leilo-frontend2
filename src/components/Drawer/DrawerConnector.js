import React from 'react'
import {Component} from 'react'
import DrawerView from "./DrawerView"
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import * as user from '../../actions/user'
import {SLOW_POLL_INTERVAL} from "../../consts";
import GroupConnector from "../GroupBar/GroupConnector";
import {routeActions} from 'redux-simple-router'

class DrawerConnector extends Component {
    constructor(props) {
        super(props);
        this.initHandlers();
    }

    initHandlers() {
        this.handleGroupClick = (group) => {
            this.props.push(`/groups/${group}`);
            this.props.onOpenChange(false);
        };

        this.handleDashboardClick = () => {
            this.props.push('/dashboard');
            this.props.onOpenChange(false);
        };
    }

    render() {
        return <DrawerView
            {...this.props}
            groups={{
                ...this.props.groups,
                value: this.props.groups.value ? this.props.groups.value.map((group) => {
                    return {
                        key: group,
                        content: <GroupConnector
                            groupID={group}
                            show={{removeCardStyle: true}}/>,
                        onClick: () => {
                            this.handleGroupClick(group)
                        },
                    }
                }) : undefined,
                onMount: this.props.loadGroups,
                onUnmount: this.props.unloadGroups,
                onClick: () => {
                    this.handleGroupClick("")
                },
            }}

            dashboard={{
                onClick: this.handleDashboardClick,
            }}
        />
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loadGroups: () => {
            dispatch(user.pollGroupsListStart(SLOW_POLL_INTERVAL))
        },
        unloadGroups: () => {
            dispatch(user.pollGroupsListStop())
        },
        push: (url) => {
            dispatch(routeActions.push(url))
        },
    };
}

function mapStateToProps(state) {
    return {
        groups: state.entities.user.groupsList
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerConnector)