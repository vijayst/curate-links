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
                .equalTo(`${topic}_${category}`)
                .on('child_added', snapshot => {
                    links = links.slice();
                    let timestamp = new Date(snapshot.child('timestamp').val());
                    timestamp = new Intl.DateTimeFormat('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric'
                    }).format(timestamp);
                    links.unshift({
                        key: snapshot.key,
                        title: snapshot.child('title').val(),
                        url: snapshot.child('url').val(),
                        claps: snapshot.child('claps').val(),
                        timestamp
                    });
                    setLinks(links);
                });
        },
        [category]
    );

    return (
        <div className="category">
            <h1>{name}</h1>
            <CreateLink topic={topic} category={category} categoryName={name} />
            <h2 className="mt24">Latest Links</h2>
            <table className="category__links">
            <tbody>
                {links.map(link => (
                    <tr className="category__link" key={link.key}>
                        <td className="category__link__timestamp">{link.timestamp}</td>
                        <td className="category__link__title">
                            <Link to={`/topics/${topic}/${category}/${link.key}`}>
                                {link.title}
                            </Link>
                        </td>
                        <td className="category__link__clap">{link.claps} claps</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
