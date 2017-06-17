import React from 'react'
import GroupConnector from "./logic/GroupConnector";
import {connect} from 'react-redux'
import AppBarView from "./ui/AppBarView";
import * as user from '../actions/user'
import {Component} from 'react'
import DrawerView from "./ui/DrawerView";

class MainApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerOpen: false,
        }
    }

    render() {
        return <div>
            <AppBarView
                onLogout={this.props.logout}
                onNavClick={() => {
                    this.setState({
                        drawerOpen: true,
                    })
                }}
            />
            <div className="content">
                <GroupConnector
                    show={{
                        atomShow: {value: true, permissions: true, settings: true},
                        permissions: true,
                        settings: true,
                        atoms: true,
                        expandedByDefault: false,
                    }}

                    groupID="5d663818-47e3-11e7-8989-5b95d87ce60a"
                />
                <pre>{JSON.stringify(this.props.state, null, "\t")}</pre>
            </div>

            <DrawerView
                open={this.state.drawerOpen}
                onOpenChange={(opened) => {
                    this.setState({
                        drawerOpen: opened,
                    })
                }}
            />
        </div>
    }
}

function mapStateToProps(state) {
    return {
        state: state.entities,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        logout: () => {
            dispatch(user.logout())
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainApp)