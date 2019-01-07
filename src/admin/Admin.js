import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Menu from './Menu';
import CreateTopic from './CreateTopic';
import firebase from '../common/firebase';

const initialItems = [
    {
        path: '/admin/topic/create',
        text: 'Create Topic'
    },
    {
        path: '/admin/settings',
        text: 'Settings'
    }
];

export default function Admin(props) {
   let [items, setItems] = useState(initialItems);
    useEffect(() => {
        firebase
            .database()
            .ref('topics')
            .on('value', function(snapshot) {
                items = initialItems.slice();
                snapshot.forEach(function(childSnapshot) {
                    const data = childSnapshot.val();
                    items.unshift({
                        text: data.name,
                        path: `/admin/topic/${data.slug}`
                    });
                    setItems(items);
                });
            });
    }, []);

    const { pathname } = props.location;

    return (
        <div className="admin">
            <header className="admin__header">Curate Links</header>
            <aside className="admin__nav">
                <Menu items={items} pathname={pathname} />
            </aside>
            <main className="admin__content">
                <Switch>
                    <Route path="/admin/topic/create" component={CreateTopic} />
                    <Route
                        path="/admin/settings"
                        render={() => <div>Settings</div>}
                    />
                </Switch>
            </main>
            <footer className="admin__footer">
                &copy;2019, All rights reserved
            </footer>
        </div>
    );
}
