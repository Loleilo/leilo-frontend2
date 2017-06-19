import React from 'react'
import {Component} from 'react'
import DrawerView from "../ui/DrawerView"
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import * as user from '../../actions/user'
import {SLOW_POLL_INTERVAL} from "../../consts";
import GroupConnector from "./GroupConnector";
import {withRouter} from 'react-router-dom'

class DrawerConnector extends Component {
    constructor(props) {
        super(props);
        this.initHandlers();
    }

    initHandlers() {
        this.handleGroupClick = (group) => {
            this.props.history.push(`/groups/${group}`);
            this.props.onOpenChange(false);
        };

        this.handleDashboardClick = () => {
            this.props.history.push('/dashboard');
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
    };
}

function mapStateToProps(state) {
    return {
        groups: state.entities.user.groupsList
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DrawerConnector))