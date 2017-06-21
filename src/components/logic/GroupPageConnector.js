import React from 'react'
import GroupConnector from "./GroupConnector";
import {Route, Switch} from "react-router-dom";
import {connect} from 'react-redux'
import * as user from "../../actions/user";
import {SLOW_POLL_INTERVAL} from "../../consts";
import GroupPageView from "../ui/GroupPageView";

function GroupPageConnector(props) {
    const routes = props.groups.value ? props.groups.value.map((group) => {
        return <Route path={`/groups/${group}`} key={group}
                      render={() => {
                          return <GroupConnector
                              show={{
                                  atomShow: {value: true, permissions: true, settings: true},
                                  permissions: true,
                                  settings: true,
                                  atoms: true,
                                  expandedByDefault: false,
                              }}

                              groupID={group}
                          />
                      }}/>
    }) : undefined;

    return <Switch>
        {routes}
        <Route exact path="/groups">
            <GroupPageView>
                {props.groups.value ? props.groups.value.map((group) => {
                    return {
                        key: group,
                        content: <GroupConnector
                            groupID={group}
                            show={{
                                atomShow: {value: true, permissions: true, settings: true},
                                permissions: true,
                                settings: true,
                                atoms: true,
                                expandedByDefault: false,
                            }}
                        />,
                    }
                }) : undefined}
            </GroupPageView>
        </Route>
    </Switch>
}

function mapDispatchToProps(dispatch) {
    return {
        loadGroups: () => {
            dispatch(user.pollGroupsListStart(SLOW_POLL_INTERVAL))
        },
        unloadGroups: () => {
            dispatch(user.pollGroupsListStop())
        },
    };
}

function mapStateToProps(state) {
    return {
        groups: state.entities.user.groupsList
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupPageConnector)
