import React, { useState, useEffect } from 'react';
import firebase from '../common/firebase';
import CreateLink from './CreateLink';
import { Link } from 'react-router-dom';

export default function Category(props) {
    const [name, setName] = useState('');
    let [links, setLinks] = useState([]);
    const { topic, category } = props.match.params;

    useEffect(
        () => {
            firebase
                .database()
                .ref(`/topics/${topic}/categories/${category}`)
                .once('value')
                .then(snapshot => {
                    setName(snapshot.child('name').val());
                });

            firebase
                .database()
                .ref('/links')
                .orderByChild('category')
                .equalTo(category)
                .on('child_added', snapshot => {
                    links = links.slice();
                    links.unshift({
                        key: snapshot.key,
                        title: snapshot.child('title').val(),
                        url: snapshot.child('url').val(),
                        timestamp: snapshot.child('timestamp').val()
                    });
                    setLinks(links);
                });
        },
        [category]
    );

    return (
        <div>
            <h1>{name}</h1>
            <CreateLink topic={topic} category={category} />
            <ul>
                {links.map(link => (
                    <li key={link.key}>
                        <Link to={`/topics/${topic}/${category}/${link.key}`}>
                            {link.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
