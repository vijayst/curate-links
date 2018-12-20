import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import Home from './home/Home';
import Login from './auth/Login';
import Admin from './admin/Admin';
import history from './common/history';
import requireAuth from './auth/requireAuth';

function App() {
    return (
        <Router history={history}>
            <Switch>
                <Route path="/admin" component={requireAuth(Admin)} />
                <Route path="/login" component={Login} />
                <Route path="/" component={Home} />
            </Switch>
        </Router>
    );
}

export default App;
