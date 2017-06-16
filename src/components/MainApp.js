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
                onNavClick={() => {
                    this.setState({
                        drawerOpen: true,
                    })
                }}
                onLogout={this.props.logout}
            />
            <div className="content">
                <GroupConnector
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
                <DrawerView
                    open={this.state.drawerOpen}
                    onOpenChange={(open) => this.setState({drawerOpen: open})}

                />
            </div>
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