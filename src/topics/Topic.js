import React, { useState, useEffect } from 'react';
import firebase from '../common/firebase';
import { Link } from 'react-router-dom';

export default function Category(props) {
    let [links, setLinks] = useState([]);
    const { topic } = props.match.params;
    const { name } = props;

    useEffect(
        () => {
            firebase
                .database()
                .ref('/links')
                .orderByChild('topic')
                .equalTo(topic)
                .once('value', snapshot => {
                    const links = [];
                    snapshot.forEach(c => {
                        const timestamp = new Date(
                            c.child('timestamp').val()
                        );
                        const formattedTime = new Intl.DateTimeFormat('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric'
                        }).format(timestamp);
                        links.unshift({
                            key: c.key,
                            title: c.child('title').val(),
                            url: c.child('url').val(),
                            claps: c.child('claps').val(),
                            internalUrl: c.child('internalUrl').val(),
                            categoryName: c.child('categoryName').val(),
                            timestamp,
                            formattedTime
                        });
                    });
                    links.sort((a, b) => b.timestamp - a.timestamp);
                    setLinks(links);
                });
        },
        [topic]
    );

    return (
        <div className="topic">
            <h1>{name}</h1>
            <h2 className="mt24">Latest Links</h2>
            <table className="topic__links">
                <tbody>
                    {links.map(link => (
                        <tr className="topic__link" key={link.key}>
                            <td className="topic__link__timestamp">
                                {link.formattedTime}
                            </td>
                            <td className="topic__link__title">
                                <Link to={link.internalUrl}>{link.title}</Link>
                            </td>
                            <td className="topic__link__category">
                                {link.categoryName}
                            </td>
                            <td className="topic__link__clap">
                                {link.claps} claps
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
