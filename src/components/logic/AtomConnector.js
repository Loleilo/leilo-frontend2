import React from 'react'
import {Component} from 'react'
import AtomView from "../ui/AtomView"
import {obj} from "../../util"
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import * as atoms from "../../actions/atoms";
import {FAST_POLL_INTERVAL, SLOW_POLL_INTERVAL} from "../../consts";

class AtomConnector extends Component {
    constructor(props) {
        super(props);

        this.state = {
            atomSubmitValue: "",
            dialogOpen: false,
            editing: false,
            valueErrors: "",
        };

        this.initHandlers();
    }

    initHandlers() {
        this.handleValueChange = (event) => {
            if (!this.state.editing)
                return;
            this.setState({
                atomSubmitValue: event.target.value,
            });
        };


        this.handlePermissionsSubmit = () => {
        };

        this.handleValueSubmit = (event) => {
            event.preventDefault();
            if (!this.state.atomSubmitValue) {
                this.setState({
                    valueErrors: "Cannot set empty value"
                });
                return;
            }
            this.props.pushValue(this.state.atomSubmitValue);
            this.setState({
                editing: false,
                valueErrors: "",
            });
        };

        this.handleEditBegin = () => {
            this.setState({
                editing: true,
            });
        };

        this.handleSettingsOpen = () => {
            this.setState({
                dialogOpen: true,
            });
        };
        this.handleSettingsClose = () => {
            this.setState({
                dialogOpen: false,
            });
        };
    }

    componentWillMount() {
        this.props.loadName();
        if (this.props.show.permissions)
            this.props.loadPerms();
        else
            this.props.fetchPerms();
    }

    componentWillUnmount() {
        this.props.unloadName();
        this.props.unloadPerms();
        this.props.unloadValue();
    }

    render() {
        const props = this.props;
        return <AtomView
            value={{
                ...this.props.value,
                onMount: props.loadValue,
                onUnmount: props.unloadValue,
                onEditChange: this.handleValueChange,
                onEditBegin: this.handleEditBegin,
                onSubmit: this.handleValueSubmit,
                displayState: obj(props.permissions, "value", "read") ? (this.state.editing ? "EDIT VIEW" : "VIEW") : "EDIT",
            }}
            name={{
                ...props.name,
            }}
            permissions={{
                ...props.permissions,
            }}
            settings={{
                open: this.state.dialogOpen,
                onOpen: this.handleSettingsOpen,
                onClose: this.handleSettingsClose,
            }}
            show={this.props.show}/>
    }
}

function mapStateToProps(state, props) {
    return {
        name: obj(state.entities.atoms.atomNames, props.groupID, props.atomID),
        value: obj(state.entities.atoms.atomValues, props.groupID, props.atomID),
        permissions: obj(state.entities.atoms.atomPerms, props.groupID, props.atomID),
    };
}

function mapDispatchToProps(dispatch, props) {
    const atomSelector = {
        group_id: props.groupID,
        atom_id: props.atomID,
    };
    return {
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
            dispatch(atoms.pollPermsStart(SLOW_POLL_INTERVAL, atomSelector))
        },
        unloadPerms: () => {
            dispatch(atoms.pollPermsStop(atomSelector))
        },
        fetchPerms: () => {
            dispatch(atoms.fetchPerms(atomSelector))
        },

    };
}

const connected = connect(mapStateToProps, mapDispatchToProps)(AtomConnector);

connected.propTypes = {
    show: PropTypes.object.isRequired,
    groupID: PropTypes.string.isRequired,
    atomID: PropTypes.string.isRequired
};

export default connected;