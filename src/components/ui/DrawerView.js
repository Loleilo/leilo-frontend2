import React from 'react'
import {Drawer} from "material-ui";

export default function (props) {
    return <Drawer open={props.open}
                   docked={false}
                   onRequestChange={props.onOpenChange}
    >
        cust
    </Drawer>
}
