import React, { useState } from 'react';
import firebase from '../common/firebase';
import Message from '../common/Message';

export default function CreateLink(props) {
    const [title, setTitle] = useState('');
    const [url, setURL] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const { topic, category, categoryName } = props;

    function getKeyFromURL(url) {
        let key = url
        .replace('https://', '')
        .replace('http://', '')
        .replace(/\./g, '_')
        .replace(/\//g, '__');
        const end = key.indexOf('?');
        if (end > 0) {
            key = key.substring(0, end);
        }
        return key;
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (title && url) {
            const key = getKeyFromURL(url);
            const linkRef = firebase
                .database()
                .ref(`links/${key}`);
            linkRef.once('value', function(snapshot) {
                if (snapshot.exists()) {
                    setError('Link already exists');
                } else {
                    linkRef.set({
                        title,
                        url,
                        timestamp: Date.now(),
                        topic,
                        category: `${topic}_${category}`,
                        categoryName, 
                        claps: 10
                    });
                    setError('');
                    setMessage('Link added, Thanks');
                    setTitle('');
                    setURL('');
                }
            });
        } else {
            setError('All fields are required');
        }
    }

    function handleTitleChange(e) {
        setTitle(e.target.value);
    }

    function handleURLChange(e) {
        setURL(e.target.value);
    }

    function handleMessageClose() {
        setError('');
        setMessage('');
    }

    let messageProps = {};
    if (error) {
        messageProps = {
            error: true,
            text: error
        };
    }
    if (message) {
        messageProps = {
            error: false,
            text: message
        };
    }

    return (
        <div className="mt24">
            <h2>Add a link</h2>
            <form className="form form--link" onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="text"
                    placeholder="Title"
                    onChange={handleTitleChange}
                    value={title}
                />
                <input
                    type="text"
                    className="text"
                    placeholder="URL"
                    onChange={handleURLChange}
                    value={url}
                />
                <div className="form__button">
                    <button className="button">Create</button>
                </div>
            </form>
            <Message {...messageProps} onClose={handleMessageClose} />
        </div>
    );
}
