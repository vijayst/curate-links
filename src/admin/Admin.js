import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Menu from './Menu'

export default function Admin(props) {
    const items = [{
        path: '/admin/topic/create',
        text: 'Create Topic'
    }, {
        path: '/admin/settings',
        text: 'Settings'
    }];

    const { pathname } = props.location

    return (
        <div className="admin">
            <header className="admin__header">
                Curate Links
            </header>
            <aside className="admin__nav">
                <Menu items={items} pathname={pathname} />
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