import React from 'react'
import {connect} from 'react-redux'
import AppBarView from "./ui/AppBarView";
import * as user from '../actions/user'
import {Component} from 'react'
import DrawerConnector from "./logic/DrawerConnector";
import ContentRouter from "./ContentRouter";

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
            <ContentRouter/>
            <DrawerConnector
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

function mapStateToProps() {
    return {

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