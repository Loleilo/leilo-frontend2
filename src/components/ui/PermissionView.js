import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import React from "react";
import {PERM_CONFIG, PERM_READ, PERM_WRITE} from "../../consts";
import PropTypes from 'prop-types'

const PermissionView = ({
                            permissions,
                            permissionsChanged,
                        }) => {
    const Component1 = (permissions & PERM_READ) === 0 ? FlatButton : RaisedButton;
    return (
        <div>
            <Component1
                label="R"
                secondary={(permissions & PERM_READ) !== 0}
                disableTouchRipple={(permissions & PERM_CONFIG) === 0}
            />
            <FlatButton
                label="W"
                secondary={(permissions & PERM_WRITE) !== 0}
                disableTouchRipple={(permissions & PERM_CONFIG) === 0}
            />
            <FlatButton
                label="C"
                secondary={(permissions & PERM_CONFIG) !== 0}
                disableTouchRipple={(permissions & PERM_CONFIG) === 0}
            />
        </div>
    );
};

PermissionView.propTypes = {
    permissions: PropTypes.number.isRequired,
    permissionsChanged: PropTypes.func
};

export default PermissionView