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
                            iframe: c.child('iframe').val(),
                            timestamp,
                            formattedTime
                        });
                    });
                    links.sort((a, b) => b.timestamp - a.timestamp);
                    setLinks(links);
                });
        },
        [category]
    );

    function handleAdd(link) {
        links = links.slice();
        links.unshift(link);
        setLinks(links);
    }

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
        <div className="category">
            <h1>{name}</h1>
            <CreateLink
                topic={topic}
                category={category}
                categoryName={name}
                onAdd={handleAdd}
            />
            <h2 className="mt24">Latest Links</h2>
            <table className="category__links mt24">
                <tbody>
                    {links.map(link => (
                        <tr className="category__link" key={link.key}>
                            <td className="category__link__timestamp">
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
                            <td className="category__link__claps">
                                {link.claps} claps
                            </td>
                            <td className="category__link__clap">
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
            <div className="category__links--hidden mt24">
                {links.map(link => (
                    <div className="category__grid" key={link.key}>
                        <div className="category__grid__timestamp">
                            {link.formattedTime}
                        </div>
                        <div className="category__grid__title">
                            <Link to={link.internalUrl}>{link.title}</Link>
                        </div>
                        <div className="category__grid__claps">
                            {link.claps} claps
                        </div>
                        <div className="category__grid__clap">
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
