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

const GroupView = ({
                       group,
                       showPerms,
                       permissionsProps,
                       dialogOpen,
                       onDialogClose,
                       onSettingsClicked,
                       showShareSettings,
                       atoms,
                       onAtomsMount,
                       onAtomsUnmount,
                       showAtomsExpander,
                       expanded,
                       onExpandClicked,
                       hideCard,
                   }) => {
    let content = <View row style={infoRow}>

        <View column auto style={{...leftContent, ...leftSelf}}>
            <strong>{loadingWrapper(group.name)}</strong>
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
        {showAtomsExpander &&
        <View column auto style={{...rightContent, ...rightSelf}}>
            <IconButton
                onClick={onExpandClicked}
                tooltip={expanded ? "Hide atoms" : "Show atoms"}
            >
                {
                    expanded ? <KeyboardArrowUp/> : <KeyboardArrowDown/>
                }
            </IconButton>
        </View>
        }
    </View>;
    if (!hideCard)
        content = <Card>
            {content}
        </Card>;
    return (
        <div>
            {content}
            {expanded &&
            <View row auto>
                <View column auto>
                    <MountSensor
                        componentWillMount={onAtomsMount}
                        componentWillUnmount={onAtomsUnmount}
                    >
                        {loadingWrapper(atoms ? atoms.map((atom) => {
                            return <View auto key={atom.key} row style={{
                                paddingTop: "10px",
                                width: "100%",
                            }}>
                                {atom.content}
                            </View>
                        }) : undefined)}
                    </MountSensor>
                </View>
            </View>}

            < Dialog
                title="Group sharing settings"
                open={dialogOpen}
                onRequestClose={onDialogClose}
            >
                shkjahfls
            </Dialog>
        </div>
    )
};

export default GroupView;