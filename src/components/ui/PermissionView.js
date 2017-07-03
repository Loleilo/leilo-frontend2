import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import React from "react";
import PropTypes from 'prop-types'
import {PERM_CONFIG, PERM_READ, PERM_WRITE} from "../../consts";
import {obj} from "../../util";

const PermissionView = ({
                            value,
                            onSubmit,
                        }) => {
    const ReadCompSelect = obj(value, "read") ? RaisedButton : FlatButton;
    const WriteCompSelect = obj(value, "write") ? RaisedButton : FlatButton;
    const ConfigCompSelect = obj(value, "config") ? RaisedButton : FlatButton;
    const generalProps = {
        disableTouchRipple: onSubmit === undefined,
        primary: true,
    };
    if (onSubmit === undefined)
        onSubmit = () => {
        };
    return (
        <div>
            <ReadCompSelect
                {...generalProps}
                label="R"
                className="permission-button-r"
                onClick={() => {
                    onSubmit(PERM_READ)
                }}
            />
            <WriteCompSelect
                {...generalProps}
                label="W"
                className="permission-button-w"
                onClick={() => {
                    onSubmit(PERM_WRITE)
                }}
            />
            <ConfigCompSelect
                {...generalProps}
                label="C"
                className="permission-button-c"
                onClick={() => {
                    onSubmit(PERM_CONFIG)
                }}
            />
        </div>
    );
};

PermissionView.propTypes = {
    permissions: PropTypes.object,
    permissionsChanged: PropTypes.func
};

export default PermissionView