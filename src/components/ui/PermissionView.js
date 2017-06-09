import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import React from "react";
import PropTypes from 'prop-types'
import {PERM_CONFIG, PERM_READ, PERM_WRITE} from "../../consts";

const PermissionView = ({
                            permissions,
                            onPermissionsSubmit,
                        }) => {
    const ReadCompSelect = permissions.read ? RaisedButton : FlatButton;
    const WriteCompSelect = permissions.write ? RaisedButton : FlatButton;
    const ConfigCompSelect = permissions.config ? RaisedButton : FlatButton;
    const generalProps = {
        disableTouchRipple: onPermissionsSubmit === undefined,
        primary: true,
    };
    if (onPermissionsSubmit === undefined)
        onPermissionsSubmit = () => {};
    return (
        <div>
            <ReadCompSelect
                {...generalProps}
                label="R"
                className="permission-button-r"
                onClick={(event) => {
                    onPermissionsSubmit(PERM_READ)
                }}
            />
            <WriteCompSelect
                {...generalProps}
                label="W"
                className="permission-button-w"
                onClick={(event) => {
                    onPermissionsSubmit(PERM_WRITE)
                }}
            />
            <ConfigCompSelect
                {...generalProps}
                label="C"
                className="permission-button-c"
                onClick={(event) => {
                    onPermissionsSubmit(PERM_CONFIG)
                }}
            />
        </div>
    );
};

PermissionView.propTypes = {
    permissions: PropTypes.object.isRequired,
    permissionsChanged: PropTypes.func
};

export default PermissionView