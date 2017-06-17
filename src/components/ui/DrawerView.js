import React from 'react'
import {Drawer} from "material-ui";
import PropTypes from 'prop-types'

function DrawerView(props) {
    return <Drawer open={props.open}
                   docked={false}
                   onRequestChange={props.onOpenChange}
    >
        cust
    </Drawer>
}

DrawerView.propTypes={
    open: PropTypes.bool.isRequired,
    onOpenChange: PropTypes.func,
};

export default DrawerView;