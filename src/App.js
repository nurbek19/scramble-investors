import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import Routes from "./Routes";

class App extends Component {
    render() {
        return (
          <Routes user={this.props.user} />
        );
    }
}

const mapStateToProps = state => ({
   user: state.users.user
});

export default withRouter(connect(mapStateToProps)(App));
