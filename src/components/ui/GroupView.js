import React from 'react'
import {infoRow, leftContent, leftSelf, rightContent, rightSelf} from "../../styles";
import {Card, Dialog, IconButton} from "material-ui";
import PermissionView from "./PermissionView";
import Settings from 'material-ui-icons/Settings'
import MountSensor from "../logic/MountSensor";
import View from "react-flexbox";
import KeyboardArrowDown from 'material-ui-icons/KeyboardArrowDown'
import KeyboardArrowUp from 'material-ui-icons/KeyboardArrowUp'
import loadingWrapper from "../logic/loadingWrapper";
import PropTypes from 'prop-types'
import {arr} from "../../util";

const GroupView = ({
                       show,
                       name,
                       permissions,
                       settings,
                       atoms,
                   }) => {
    let content = <View row style={infoRow}>

        <View column auto style={{...leftContent, ...leftSelf}}>
            <strong>{loadingWrapper(name.value)}</strong>
        </View>
        <View column/>
        <View column auto style={{...rightContent, ...rightSelf}}>
            {show.permissions && <PermissionView {...permissions}/>}
        </View>
        <View column auto style={{...rightContent, ...rightSelf}}>
            {show.settings &&
            <IconButton
                onClick={settings.onOpen}
                tooltip="Sharing settings"
                disabled={!arr(permissions, "value", "config")}
            ><Settings/></IconButton>}
        </View>
        {show.atoms &&
        <View column auto style={{...rightContent, ...rightSelf}}>
            <IconButton
                onClick={atoms.onExpand}
                tooltip={atoms.expanded ? "Hide atoms" : "Show atoms"}
            >
                {
                    atoms.expanded ? <KeyboardArrowUp/> : <KeyboardArrowDown/>
                }
            </IconButton>
        </View>
        }
    </View>;

    if (!show.card)
        content = <Card>
            {content}
        </Card>;
    return (
        <div>
            {content}
            {atoms.expanded &&
            <View row auto>
                <View column auto>
                    <MountSensor
                        componentWillMount={atoms.onMount}
                        componentWillUnmount={atoms.onUnmount}
                    >
                        {
                            loadingWrapper(atoms.value ? atoms.value.map((atom) => {
                                return <View auto key={atom.key} row style={{
                                    paddingTop: "10px",
                                    width: "100%",
                                }}>
                                    {atom.content}
                                </View>
                            }) : undefined)
                        }
                    </MountSensor>
                </View>
            </View>}

            {show.settings &&
            < Dialog
                title="Group sharing settings"
                open={settings.open}
                onRequestClose={settings.onClose}
            >
                Settings go here
            </Dialog>}
        </div>
    )
};

GroupView.propTypes = {
    show: PropTypes.shape({
        permissions: PropTypes.bool,
        settings: PropTypes.bool,
        atoms: PropTypes.bool,
    }).isRequired,
    atoms: PropTypes.shape({
        onMount: PropTypes.func,
        onUnmount: PropTypes.func,
        onExpand: PropTypes.func,
    }).isRequired,
    name: PropTypes.shape({
        value: PropTypes.string,
    }).isRequired,
    permissions: PropTypes.object,
    settings: PropTypes.shape({
        open: PropTypes.bool,
        onOpen: PropTypes.func,
        onClose: PropTypes.func,
    }).isRequired,
};

export default GroupView;