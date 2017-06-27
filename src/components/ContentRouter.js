import {Route} from 'react-router-dom'
import React from 'react'
import Dashboard from "./ui/Dashboard";
import GroupPageConnector from "./logic/GroupPageConnector";

export default function ContentRouter() {
    return <div className="content">
        <Route exact path="/dashboard" component={Dashboard}/>
        <GroupPageConnector/>
        <Route exact path="/" component={Dashboard}/>
    </div>
}