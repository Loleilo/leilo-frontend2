import  React from "react";
import {Component} from 'react'
import {obj} from "../../util";
import * as groups from "../../actions/groups";
import {MEDIUM_POLL_INTERVAL, SLOW_POLL_INTERVAL} from "../../consts";
import GroupView from "./GroupView";
import AtomConnector from "../AtomBar/AtomConnector";
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

//todo replace with function using MountSensor
class GroupConnector extends Component {
    constructor(props) {
        super(props);

        this.state = {
            settingsOpen: false,
            expanded: this.props.show.expandedByDefault && true,
        };

        this.initHandlers();
    }

    initHandlers() {
        this.handleSettingsOpen = () => {
            this.setState({
                settingsOpen: true,
            });
        };
        this.handleSettingsClose = () => {
            this.setState({
                settingsOpen: false,
            });
        };

        this.handleExpandClicked = () => {
            this.setState({
                expanded: !this.state.expanded,
            });
        };
    }

    componentWillMount() {
        this.props.loadName();

        this.props.fetchPerms();
    }

    componentWillUnmount() {
        this.props.unloadName();
    }

    render() {
        let atomsRender = undefined;
        if (this.props.show.atoms && this.props.atoms.value && this.props.atoms.value.map) {
            atomsRender = this.props.atoms.value.map((val) => {
                return {
                    key: val,
                    content: <AtomConnector
                        show={this.props.show.atomShow}
                        atomID={val}
                        groupID={this.props.groupID}
                    />
                }
            });
        }

        return <GroupView
            show={this.props.show}
            atoms={{
                value: atomsRender,
                onMount: this.props.loadAtoms,
                onUnmount: this.props.unloadAtoms,
                onExpand: this.handleExpandClicked,
                expanded: this.state.expanded,
            }}
            name={this.props.name}
            settings={{
                open: this.state.settingsOpen,
                addOpen: this.handleSettingsOpen,
                onClose: this.handleSettingsClose,
            }}
        />
    }
}

GroupConnector.propTypes = {
    show: PropTypes.shape({
        atomShow: PropTypes.object,
    }).isRequired,
    groupID: PropTypes.string.isRequired,
};

function mapStateToProps(state, props) {
    return {
        name: obj(state.entities.groups.groupNames, props.groupID),
        permissions: obj(state.entities.groups.groupPerms, props.groupID),
        atoms: obj(state.entities.groups.groupAtomsList, props.groupID),
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

        fetchPerms: () => {
            dispatch(groups.fetchPerms(groupSelector));
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