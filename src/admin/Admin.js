import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';

export default function Admin() {
    return (
        <div className="admin">
            <header className="admin__header">
                Curate Links
            </header>
            <aside className="admin__nav">
                <ul className="nav">
                    <li className="nav__item"><Link to="/admin/topic/create">Create Topic</Link></li>
                    <li className="nav__item"><Link to="/admin/settings">Settings</Link></li>
                </ul>
            </aside>
            <main className="admin__content">
                <Switch>
                    <Route path="/admin/topic/create" render={() => <div>Create Topic</div>} />
                    <Route path="/admin/settings" render={() => <div>Settings</div>} />
                </Switch>
            </main>
            <footer className="admin__footer">
                &copy;2019, All rights reserved
            </footer>
        </div>
    );
}