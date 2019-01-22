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
                .ref(`/topics/${topic}/categories`)
                .once('value', snapshot => {
                    const links = [];
                    snapshot.forEach(c => {
                        links.unshift({
                            slug: c.key,
                            url: c.child('url').val(),
                            name: c.child('name').val(),
                            image: c.child('image').val(),
                            description: c.child('description').val(),
                        });
                    });
                    setLinks(links);
                });
        },
        [topic]
    );

    return (
        <div className="topic">
            <h1>{name}</h1>
            <div className="topic__categories mt24">
                {links.map(link => (
                    <div key={link.slug} className="topic__category">
                        <div className="topic__category__name">{link.name}</div>
                        <div className="topic__category__url"><a target="_blank" rel="noopener noreferrer" href={link.url}>Official Site</a> | <Link to={`/topics/${topic}/${link.slug}`}>View links</Link></div>
                        <div className="topic__category__desc">{link.description}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
