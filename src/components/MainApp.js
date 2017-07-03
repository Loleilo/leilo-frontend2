import React from 'react'
import {connect} from 'react-redux'
import AppBarView from "./Appbar/AppBarView";
import * as user from '../actions/user'
import {Component} from 'react'
import DrawerConnector from "./Drawer/DrawerConnector";
import ContentRouter from "./ContentRouter";
import {withRouter} from "react-router-dom";

class MainApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerOpen: false,
        }
    }

    render() {
        return <div>
           <DrawerConnector
                open={this.state.drawerOpen}
                onOpenChange={(opened) => {
                    this.setState({
                        drawerOpen: opened,
                    })
                }}
            />
            <AppBarView
                onLogout={this.props.logout}
                onNavClick={() => {
                    this.setState({
                        drawerOpen: true,
                    })
                }}
            />
            <ContentRouter location={this.props.location}/>
        </div>
    }
}

function mapStateToProps() {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {
        logout: () => {
            dispatch(user.logout())
        },
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainApp))

//
//     <GroupConnector
// show={{
//     atomShow: {value: true, permissions: true, settings: true},
//     permissions: true,
//         settings: true,
//         atoms: true,
//         expandedByDefault: false,
// }}
//
// groupID="5d663818-47e3-11e7-8989-5b95d87ce60a"
//     />
//