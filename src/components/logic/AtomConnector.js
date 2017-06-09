import React from 'react'
import {Component} from 'react'
import AtomView from "../ui/AtomView"
import {convertPermsToObj, arr} from "../../util"
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import * as atoms from "../../actions/atoms";
import {FAST_POLL_INTERVAL, MEDIUM_POLL_INTERVAL, SLOW_POLL_INTERVAL} from "../../consts";

class AtomConnector extends Component {
    constructor(props) {
        super(props);

        this.state = {
            atomSubmitValue: "",
            dialogOpen: false,
            editing: false,
        };

        this.initHandlers();
    }

    initHandlers() {
        this.handleAtomValueChange = (event) => {
            if(!this.state.editing)
                return;
            this.setState({
                atomSubmitValue: event.target.value,
            });
        };


        this.handlePermissionsSubmit = () => {
        };

        this.handleAtomValueSubmit = (event) => {
            event.preventDefault();
            this.props.atom.pushValue(this.state.atomSubmitValue);
            this.setState({
                editing: false,
            });
        };

        this.handleValueMount = this.props.atom.loadValue;
        this.handleValueUnmount = this.props.atom.unloadValue;

        this.handleEditClick = () => {
            this.setState({
                editing: true,
            });
        };

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
    }

    componentWillMount() {
        this.props.atom.loadName();
        if (this.props.showPermissions)
            this.props.atom.loadPerms();
        else
            this.props.atom.fetchPerms();
    }

    componentWillUnmount() {
        this.props.atom.unloadName();
        this.props.atom.unloadPerms();
        this.props.atom.unloadValue();
    }

    render() {
        const convertedPerms = this.props.atomPermissions;
        return <AtomView
            atom={{
                name: this.props.atomName,
                value: this.props.atomValue,
            }}

            permissionsProps={ {
                permissions: convertedPerms,
                onPermissionsSubmit: this.props.allowPermissionsSubmit && convertedPerms.config ? this.handlePermissionsSubmit : undefined,
            }}

            dialogOpen={this.state.dialogOpen}
            onSettingsClicked={ this.handleDialogOpen}
            onDialogClose={this.handleDialogClose}

            showShareSettings={this.props.showShareSettings}

            showAtomValueControls={this.props.showAtomValueControls && (convertedPerms.read || convertedPerms.write)}
            onValueSubmitted={this.handleAtomValueSubmit}
            onValueChanged={this.handleAtomValueChange}
            valueDisplayState={
                convertedPerms.read ? (this.state.editing ? "EDIT VIEW" : "VIEW") : "EDIT"
            }
            onEditClick={this.handleEditClick}

            showPerms={this.props.showPermissions}

            onValueMount={this.handleValueMount}
            onValueUnmount={this.handleValueUnmount}
        />
    }
}

function mapStateToProps(state, props) {
    return {
        ...props.uiProps,
        atomName: arr(state.entities.atoms.atomNames, props.groupID, props.atomID).value,
        atomValue: arr(state.entities.atoms.atomValues, props.groupID, props.atomID).value,
        atomPermissions: convertPermsToObj(arr(state.entities.atoms.atomPerms, props.groupID, props.atomID).value),
    };
}

function mapDispatchToProps(dispatch, props) {
    const atomSelector = {
        group_id: props.groupID,
        atom_id: props.atomID,
    };
    return {
        atom: {
            loadName: () => {
                dispatch(atoms.pollNameStart(SLOW_POLL_INTERVAL, atomSelector))
            },
            unloadName: () => {
                dispatch(atoms.pollNameStop(atomSelector))
            },

            loadValue: () => {
                dispatch(atoms.pollValueStart(FAST_POLL_INTERVAL, atomSelector))
            },
            unloadValue: () => {
                dispatch(atoms.pollValueStop(atomSelector))
            },
            pushValue: (value) => {
                dispatch(atoms.pushValue({...atomSelector, value: value}))
            },

            loadPerms: () => {
                dispatch(atoms.pollPermsStart(MEDIUM_POLL_INTERVAL, atomSelector))
            },
            unloadPerms: () => {
                dispatch(atoms.pollPermsStop(atomSelector))
            },
            fetchPerms: () => {
                dispatch(atoms.fetchPerms(atomSelector))
            },
        },

    };
}

const connected = connect(mapStateToProps, mapDispatchToProps)(AtomConnector);

connected.propTypes = {
    uiProps: PropTypes.object,
    groupID: PropTypes.string.isRequired,
    atomID: PropTypes.string.isRequired
};

export default connected;