import React from 'react'
import {connect} from 'react-redux'
import MountSensor from "../../util/MountSensor";
import DigitalWidgetView from "./DigitalWidgetView";
import {obj} from "../../../util";
import * as Atoms from "../../../actions/atoms"
import {FAST_POLL_INTERVAL} from "../../../consts";
import PropTypes from 'prop-types'

function DigitalWidgetConnector(props) {
    const actualConfig = props.config;
    return <MountSensor componentWillMount={props.loadAtomValues} componentWillUnmount={props.unloadAtomValues}>
        <DigitalWidgetView
            title={actualConfig.title}
            lastUpdate={new Date(obj(props, "heartbeat", "value"))}
            value={actualConfig.mapping[obj(props, "atom", "value")]}
        />
    </MountSensor>
}

function mapStateToProps(state, props) {
    const actualConfig = props.config;
    return {
        atom: obj(state.entities.atoms.atomValues, actualConfig.groupID, actualConfig.atomID),
        heartbeat: obj(state.entities.atoms.atomValues, actualConfig.groupID, actualConfig.heartbeatID),
    }
}

function mapDispatchToProps(dispatch, props) {
    const actualConfig = props.config;

    return {
        loadAtomValues: () => {
            dispatch(Atoms.pollValueStart(FAST_POLL_INTERVAL, {
                group_id: actualConfig.groupID, atom_id: actualConfig.atomID
            }));
            dispatch(Atoms.pollValueStart(FAST_POLL_INTERVAL, {
                group_id: actualConfig.groupID, atom_id: actualConfig.heartbeatID
            }));
        },
        unloadAtomValues: () => {
            dispatch(Atoms.pollValueStop({
                group_id: actualConfig.groupID, atom_id: actualConfig.atomID
            }));
            dispatch(Atoms.pollValueStop({
                group_id: actualConfig.groupID, atom_id: actualConfig.heartbeatID
            }))
        }
    }
}

const connected = connect(mapStateToProps, mapDispatchToProps)(DigitalWidgetConnector);

connected.propTypes = {
    config: PropTypes.shape({
        groupID: PropTypes.string.isRequired,
        atomID: PropTypes.string.isRequired,
        heartbeatID: PropTypes.string.isRequired,
        mapping: PropTypes.object.isRequired,
    }),
};

export default connected;