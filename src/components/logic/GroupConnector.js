import  React from "react";
import {Component} from 'react'
import {arr, convertPermsToObj} from "../../util";
import * as groups from "../../actions/groups";
import {MEDIUM_POLL_INTERVAL, SLOW_POLL_INTERVAL} from "../../consts";
import GroupView from "../ui/GroupView";
import AtomConnector from "./AtomConnector";
import {connect} from 'react-redux'

class GroupConnector extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dialogOpen: false,
            expanded: this.props.expandedByDefault,
        };

        this.initHandlers();
    }

    initHandlers() {
        this.handleDialogOpen = () => {
            this.setState({
                dialogOpen: true,
            });
        };
        this.handleDialogClose = () => {
            this.setState({
                dialogOpen: false,
            });
        };

        this.handlePermissionsSubmit = () => {
        };

        this.handleExpandClicked = () => {
            this.setState({
                expanded: !this.state.expanded,
            });
        };
    }

    componentWillMount() {
        this.props.loadName();
        if (this.props.showPermissions)
            this.props.loadPerms();
        else
            this.props.fetchPerms();
    }

    componentWillUnmount() {
        this.props.unloadName();
        this.props.unloadPerms();
    }

    render() {
        let atomsRender = undefined;
        if (this.props.showAtomsExpander && this.props.groupAtoms && this.props.groupAtoms.map) {
            atomsRender = this.props.groupAtoms.map((val) => {
                return {
                    key: val,
                    content: <AtomConnector
                        uiProps={this.props.atomUIProps}
                        atomID={val}
                        groupID={this.props.groupID}
                    />
                }
            });
        }

        return <GroupView
            group={{
                name: this.props.groupName,
            }}
            permissionsProps={{
                permissions: this.props.groupPerms,
                onPermissionsSubmit: this.props.allowPermissionsSubmit && this.props.groupPerms.config ? this.handlePermissionsSubmit : undefined,
            }}

            showPerms={this.props.showPermissions}
            showShareSettings={this.props.showShareSettings}
            showAtomsExpander={this.props.showAtomsExpander}

            expanded={this.state.expanded}
            onExpandClicked={this.handleExpandClicked}

            onAtomsMount={this.props.loadAtoms}
            onAtomsUnmount={this.props.unloadAtoms}

            atoms={atomsRender}

            dialogOpen={this.state.dialogOpen}
            onDialogClose={this.handleDialogClose}
            onSettingsClicked={this.handleDialogOpen}
        />
    }
}

function mapStateToProps(state, props) {
    return {
        ...props.uiProps,
        groupID: props.groupID,
        groupName: arr(state.entities.groups.groupNames, props.groupID).value,
        groupPerms: convertPermsToObj(arr(state.entities.groups.groupPerms, props.groupID).value),
        groupAtoms: arr(state.entities.groups.groupAtomsList, props.groupID).value,
    }
}

function mapDispatchToProps(dispatch, props) {
    const groupSelector = {
        group_id: props.groupID,
    };
    return {
        loadName: () => {
            dispatch(groups.pollNameStart(SLOW_POLL_INTERVAL, groupSelector))
        },
        unloadName: () => {
            dispatch(groups.pollNameStop(groupSelector))
        },

        loadPerms: () => {
            dispatch(groups.pollPermsStart(MEDIUM_POLL_INTERVAL, groupSelector))
        },
        unloadPerms: () => {
            dispatch(groups.pollPermsStop(groupSelector))
        },

        loadAtoms: () => {
            dispatch(groups.pollAtomsStart(MEDIUM_POLL_INTERVAL, groupSelector))
        },
        unloadAtoms: () => {
            dispatch(groups.pollAtomsStop(groupSelector))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupConnector)