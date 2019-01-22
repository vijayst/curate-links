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
                        const timestamp = new Date(c.child('timestamp').val());
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
                            iframe: c.child('iframe').val(),
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

    function handleClap(key, claps) {
        firebase
            .database()
            .ref(`/links/${key}/claps`)
            .set(claps + 1);
        links = links.slice();
        const index = links.findIndex(l => l.key === key);
        links[index] = {
            ...links[index],
            claps: claps + 1
        };
        setLinks(links);
    }

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
                            <td className="category__link__title">
                                {link.iframe ? (
                                    <Link to={link.internalUrl}>
                                        {link.title}
                                    </Link>
                                ) : (
                                    <a
                                        href={link.url}
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        {link.title}
                                    </a>
                                )}
                            </td>
                            <td className="topic__link__category">
                                {link.categoryName}
                            </td>
                            <td className="topic__link__claps">
                                {link.claps} claps
                            </td>
                            <td className="topic__link__clap">
                                <button
                                    className="link-button"
                                    onClick={handleClap.bind(
                                        this,
                                        link.key,
                                        link.claps
                                    )}
                                >
                                    Clap
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="topic__links--hidden mt24">
                {links.map(link => (
                    <div className="topic__grid" key={link.key}>
                        <div className="topic__grid__timestamp">
                            {link.formattedTime}
                        </div>
                        <div className="topic__grid__title">
                            {link.iframe ? (
                                <Link to={link.internalUrl}>{link.title}</Link>
                            ) : (
                                <a href={link.url}>{link.title}</a>
                            )}
                        </div>
                        <div className="topic__grid__category">
                            {link.categoryName}
                        </div>
                        <div className="topic__grid__claps">
                            {link.claps} claps
                        </div>
                        <div className="topic__grid__clap">
                            <button
                                className="link-button"
                                onClick={handleClap.bind(
                                    this,
                                    link.key,
                                    link.claps
                                )}
                            >
                                Clap
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
