import React from 'react'
import {connect} from 'react-redux'

function TmpDashboard(props) {
    return <pre>{JSON.stringify(props.state, null, " ")}</pre>;
}

export default connect((state) => {
    return {
        state: state.entities,
    }
})(TmpDashboard);