import React from 'react'
import GroupConnector from "./logic/GroupConnector";
import {connect} from 'react-redux'

function mapStateToProps(state) {
    return {
        state: state.entities,
    }
}

function mapDispatchToProps(dispatch) {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(function (props) {
    return <div><GroupConnector
        uiProps={{
            showShareSettings: true,
            showPermissions: true,
            showAtomsExpander: true,
            atomUIProps: {
                showShareSettings: true,
                showPermissions: true,
                showAtomValueControls: true,
            }
        }}

        groupID="5d663818-47e3-11e7-8989-5b95d87ce60a"
        />
        <pre>{JSON.stringify(props.state, null, "\t")}</pre>
        </div>
})