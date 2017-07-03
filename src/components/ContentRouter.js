import {Route} from 'react-router-dom'
import React from 'react'
import Dashboard from "./logic/DashboardConnector";
import GroupPageConnector from "./logic/GroupPageConnector";

export default function ContentRouter() {
    return <div className="content">
        <Route exact path="/dashboard" component={Dashboard}/>
        <GroupPageConnector/>
        <Route exact path="/" component={Dashboard}/>
    </div>
}