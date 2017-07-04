import React from 'react'
import PropTypes from 'prop-types'
import {Card} from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import Settings from 'material-ui-icons/Settings'
import IconButton from 'material-ui/IconButton'
import Dialog from 'material-ui/Dialog'
import View from 'react-flexbox'
import {infoRow, leftContent, leftSelf, rightContent, rightSelf} from "../../styles";
import ModeEdit from 'material-ui-icons/ModeEdit'
import MountSensor from "../util/MountSensor";
import loadingWrapper from "../util/loadingWrapper";
import {WRITING} from "../../reducers/states";
import CircularProgress from "material-ui/CircularProgress";

const AtomView = ({
                      show,
                      value,
                      name,
                      permissions,
                      settings,
                  }) => {
    let valueDisplay = null;
    if (show.value) {
        if (value.displayState === "EDIT VIEW") {
            valueDisplay = (
                <MountSensor
                    componentWillMount={value.onMount}
                    componentWillUnmount={value.onUnmount}
                >
                    <form onSubmit={value.onSubmit}><TextField
                        name="value"
                        defaultValue={ value.value }
                        onChange={value.onEditChange}
                        autoFocus
                        onBlur={value.onSubmit}
                        errorText={value.lastError}
                    /></form>
                </MountSensor>
            );
        } else if (value.displayState === "VIEW") {
            valueDisplay = (
                <MountSensor
                    componentWillMount={value.onMount}
                    componentWillUnmount={value.onUnmount}
                >
                    <View row auto
                          onClick={value.onEditBegin} className="click-on-edit-field">
                        <View column auto style={{...leftContent, ...leftSelf}}>
                            <span >
                            {loadingWrapper(value.value)}
                            </span>
                        </View>
                        <View column auto>
                            <IconButton tooltip="Click to edit">
                                <ModeEdit/>
                            </IconButton>
                        </View>
                    </View>
                </MountSensor>
            );
        } else if (value.displayState === "EDIT") {
            valueDisplay = <form onSubmit={value.onSubmit}><TextField
                name="value"
                onChange={value.onEditChange}
                autoFocus
                onBlur={value.onSubmit}
                errorText={value.lastError}
            /></form>
        }
    }
    return (
        <div>
            <Card>
                <View row style={infoRow}>
                    <View column auto style={{...leftContent, ...leftSelf}}>
                        <strong>{loadingWrapper(name.value)}{valueDisplay ? ":" : null}</strong>
                    </View>
                    <View column style={{...leftContent, ...leftSelf, maxWidth: '10%'}}>
                        {valueDisplay}
                    </View>
                    <View column/>
                    <View column auto style={{...rightContent, ...rightSelf}}>
                        {show.settings && value.syncState === WRITING ? <CircularProgress size={30}/> :
                            <IconButton
                                onClick={settings.addOpen}
                                tooltip={permissions.value.config ? "Sharing settings" : "Not enough perms"}
                                disabled={!permissions.value.config}
                            ><Settings/></IconButton>}
                    </View>
                </View>
            </Card>
            {show.settings &&
            <Dialog
                title="Atom sharing settings"
                open={settings.open}
                onRequestClose={settings.onClose}
            >
                Settings go here
            </Dialog>
            }
        </div>
    )
};
AtomView.propTypes = {
    show: PropTypes.shape({
        value: PropTypes.bool,
        settings: PropTypes.bool,
    }).isRequired,
    value: PropTypes.shape({
        onMount: PropTypes.func,
        onUnmount: PropTypes.func,
        onEditChange: PropTypes.func,
        onEditBegin: PropTypes.func,
        onSubmit: PropTypes.func,
        displayState: PropTypes.string,
    }).isRequired,
    name: PropTypes.shape({
        value: PropTypes.string,
    }).isRequired,
    settings: PropTypes.shape({
        open: PropTypes.bool,
        addOpen: PropTypes.func,
        onClose: PropTypes.func,
    }).isRequired,
};

export default AtomView;