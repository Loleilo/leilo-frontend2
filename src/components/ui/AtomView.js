import React from 'react'
import PropTypes from 'prop-types'
import {Card} from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import PermissionView from './PermissionView'
import Settings from 'material-ui-icons/Settings'
import IconButton from 'material-ui/IconButton'
import Dialog from 'material-ui/Dialog'
import View from 'react-flexbox'
import {infoRow, leftContent, leftSelf, rightContent, rightSelf} from "../../styles";
import ModeEdit from 'material-ui-icons/ModeEdit'
import MountSensor from "../logic/MountSensor";
import loadingWrapper from "../logic/loadingWrapper";

const AtomView = ({
                      atom,
                      permissionsProps,

                      onSettingsClicked,
                      showShareSettings,

                      onValueSubmitted,
                      onValueChanged,
                      showAtomValueControls,
                      onValueMount,
                      onValueUnmount,
                      onEditClick,
                      valueDisplayState,
    valueErrors,

                      dialogOpen,
                      onDialogClose,

                      showPerms,
                  }) => {
    let valueDisplay = null;
    if (showAtomValueControls) {
        if (valueDisplayState === "EDIT VIEW") {
            valueDisplay = (
                <MountSensor
                    componentWillMount={onValueMount}
                    componentWillUnmount={onValueUnmount}
                >
                    <form onSubmit={onValueSubmitted}><TextField
                        name="value"
                        defaultValue={ atom.value }
                        onChange={onValueChanged}
                        autoFocus
                        onBlur={onValueSubmitted}
                        errorText={valueErrors}
                    /></form>
                </MountSensor>
            );
        } else if (valueDisplayState === "VIEW") {
            valueDisplay = (
                <MountSensor
                    componentWillMount={onValueMount}
                    componentWillUnmount={onValueUnmount}
                >
                    <View row auto
                          onClick={onEditClick} className="click-on-edit-field">
                        <View column auto style={{...leftContent, ...leftSelf}}>
                            <span >
                            {loadingWrapper(atom.value)}
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
        } else if (valueDisplayState === "EDIT") {
            valueDisplay = <form onSubmit={onValueSubmitted}><TextField
                name="value"
                onChange={onValueChanged}
                autoFocus
                onBlur={onValueSubmitted}
                errorText={valueErrors}
            /></form>
        }
    }
    return (
        <div>
            <Card>
                <View row style={infoRow}>
                    <View column auto style={{...leftContent, ...leftSelf}}>
                        <strong>{loadingWrapper(atom.name)}{valueDisplay ? ":" : null}</strong>
                    </View>
                    <View column style={{...leftContent, ...leftSelf, maxWidth: '10%'}}>
                        {valueDisplay}
                    </View>
                    <View column/>
                    <View column auto style={{...rightContent, ...rightSelf}}>
                        {showPerms && <PermissionView {...permissionsProps}/>}
                    </View>
                    <View column auto style={{...rightContent, ...rightSelf}}>
                        {showShareSettings &&
                        <IconButton
                            onClick={onSettingsClicked}
                            tooltip="Sharing settings"
                            disabled={!permissionsProps.permissions.config}
                        ><Settings/></IconButton>}
                    </View>
                </View>
            </Card>
            {showShareSettings &&
            <Dialog
                title="Atom sharing settings"
                open={dialogOpen}
                onRequestClose={onDialogClose}
            >
                shkjahfls
            </Dialog>
            }
        </div>
    )
};

AtomView.propTypes = {
    atom: PropTypes.object,
    valueEditable: PropTypes.bool,
    permissionsProps: PropTypes.object,
    onValueSubmitted: PropTypes.func,
    onSettingsClicked: PropTypes.func,
    dialogOpen: PropTypes.bool,
    onDialogClose: PropTypes.func,
    showShareSettings: PropTypes.bool,
    onValueMount: PropTypes.func,
    onValueUnmount: PropTypes.func,
    showAtomValueControls: PropTypes.bool,
    showValue: PropTypes.bool,
};

export default AtomView;