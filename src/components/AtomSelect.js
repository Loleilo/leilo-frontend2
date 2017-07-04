import  React from "react";
import {Component} from 'react'
import {connect} from 'react-redux'
import {obj} from "../util";
import * as atoms from "../actions/atoms";
import {MEDIUM_POLL_INTERVAL, SLOW_POLL_INTERVAL} from "../consts";
import * as groups from "../actions/groups";
import MountSensor from "./util/MountSensor";
import SelectView from "./util/SelectView";

class AtomSelect extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        if (this.props.groupID)
            this.props.fetchAtoms();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.groupID !== this.props.groupID)
            this.props.fetchAtoms();
        if (prevProps.atoms.value)
            for (let i = 0; i < this.props.atoms.value.length; i++) {
                this.props.fetchName(this.props.atoms.value[i])
            }
    }

    render() {
        const props = this.props;
        return <SelectView
            label={props.label}
            selections={props.atoms.value && props.atoms.value.map((atom) => {
                const dispName = obj(props.names, atom).value;
                return {
                    value: atom,
                    displayName: dispName ? dispName : "Loading...",
                }
            })}
            selected={props}
            disabled={!props.groupID}
        />
    }
}

function mapStateToProps(state, props) {
    return {
        names: obj(state.entities.atoms.atomNames, props.groupID),
        atoms: obj(state.entities.groups.groupAtomsList, props.groupID),
    };
}

function mapDispatchToProps(dispatch, props) {
    return {
        fetchName: (atomID) => {
            dispatch(atoms.fetchName({
                group_id: props.groupID,
                atom_id: atomID,
            }))
        },
        fetchAtoms: () => {
            dispatch(groups.fetchAtoms({group_id: props.groupID}))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AtomSelect)