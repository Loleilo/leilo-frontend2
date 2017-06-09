import React from 'react'
import AtomConnector from "./logic/AtomConnector";


export default function () {
    return <AtomConnector
        uiProps={{
            showShareSettings:true,
            showAtomValueControls:true,
            showPermissions: true,
        }}

        atomID="7ef0c17c-47e3-11e7-8989-5b95d87ce60a"
        groupID="5d663818-47e3-11e7-8989-5b95d87ce60a"
    />
}