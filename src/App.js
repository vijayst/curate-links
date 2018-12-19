import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Home from './home/Home';
import Login from './auth/Login';
import Admin from './admin/Admin';

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/admin" component={Admin} />
                <Route path="/login" component={Login} />
                <Route path="/" component={Home} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
