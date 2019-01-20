import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Menu from '../common/Menu';
import firebase from '../common/firebase';
import Topic from './Topic';
import Category from './Category';
import Page from './Page';
import { Link } from 'react-router-dom';
import Header from './Header';

export default function Layout(props) {
    const [topicName, setTopicName] = useState('');
    let [items, setItems] = useState([]);
    const { topic } = props.match.params;

    useEffect(() => {
        firebase
            .database()
            .ref(`topics/${topic}`)
            .once('value', function(snapshot) {
                setTopicName(snapshot.child('name').val());
                const items = [];
                snapshot.child('categories').forEach(function(childSnapshot) {
                    const data = childSnapshot.val();
                    items.unshift({
                        text: data.name,
                        path: `/topics/${topic}/${data.slug}`
                    });
                    setItems(items);
                });
            });
    }, []);

    const { pathname } = props.location;

    return (
        <div className="topics">
            <aside className="topics__nav">
                <div className="topics__nav__topic">
                    <Link to={`/topics/${topic}`}>{topicName}</Link>
                </div>
                <Menu items={items} pathname={pathname} />
            </aside>
            <main className="topics__content">
                <Switch>
                    <Route
                        path="/topics/:topic/:category/:page"
                        component={Page}
                    />
                    <Route
                        path="/topics/:topic/:category"
                        component={Category}
                    />
                    <Route path="/topics/:topic" render={props => <Topic {...props} name={topicName} />} />
                </Switch>
            </main>
        </div>
    );
}
