import {Route} from 'react-router-dom'
import React from 'react'
import TmpDashboard from "./ui/TmpDashboard";
import GroupPageConnector from "./logic/GroupPageConnector";

export default function ContentRouter() {
    return <div className="content">
        <Route exact path="/dashboard" component={TmpDashboard}/>
        <GroupPageConnector/>
        <Route exact path="/" component={TmpDashboard}/>
    </div>
}