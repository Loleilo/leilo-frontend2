import React from 'react'
import {infoRow, leftContent, leftSelf, rightContent, rightSelf} from "../../styles";
import Card from "material-ui/Card";
import Dialog from 'material-ui/Dialog'
import IconButton from 'material-ui/IconButton'
import PermissionView from "./PermissionView";
import Settings from 'material-ui-icons/Settings'
import MountSensor from "../logic/MountSensor";
import View from "react-flexbox";
import KeyboardArrowDown from 'material-ui-icons/KeyboardArrowDown'
import KeyboardArrowUp from 'material-ui-icons/KeyboardArrowUp'
import loadingWrapper from "../logic/loadingWrapper";
import PropTypes from 'prop-types'
import {obj} from "../../util";
import ListView from "./ListView";

const GroupView = ({
                       show,
                       name,
                       permissions,
                       settings,
                       atoms,
                   }) => {
    let nameContent = loadingWrapper(name.value);
    if (!show.removeCardStyle)
        nameContent = <strong>{nameContent}</strong>;
    let content = <View row style={show.removeCardStyle ? undefined : infoRow}>

        <View column auto style={{...leftContent, ...leftSelf}}>
            {nameContent}
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
                disabled={!obj(permissions, "value", "config")}
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

    if (!show.removeCardStyle)
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
                        <ListView style={{
                            paddingTop: "10px",
                        }}>{atoms.value}</ListView>
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
        removeCardStyle: PropTypes.bool,
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