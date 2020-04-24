import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";

import Photos from "./containers/Photos/Photos";
import Login from "./containers/Login/Login";
import Register from "./containers/Register/Register";
import UserPhotos from "./containers/UserPhotos/UserPhotos";
import NewPhoto from "./containers/NewPhoto/NewPhoto";

const ProtectedRoute = ({isAllowed, ...props}) => (
  isAllowed ? <Route {...props} /> : <Redirect to="/login" />
);

const Routes = ({user}) => {
    return (
        <Switch>
            <Route path="/" exact component={Login}/>
            <Route path="/register" exact component={Register}/>
            <Route path="/login" exact component={Login}/>
            <ProtectedRoute
                isAllowed={user}
                path="/new-photo"
                exact
                component={NewPhoto}
            />
            <Route path="/photos/:id" exact component={UserPhotos}/>
        </Switch>
    );
};

export default Routes;
