import React, { useState } from 'react';
import firebase from '../common/firebase';
import LinkBox from '../common/LinkBox';
import Message from '../common/Message';

let submitProps;

export default function CreateLink(props) {
    const [url, setURL] = useState('');
    const [disabled, setDisabled] = useState(true);
    const { topic, category, categoryName, onAdd } = props;
    const [message, setMessage] = useState('');

    function handleSubmit(e) {
        const { key, title, url, iframe } = submitProps;
        e.preventDefault();
        const linkRef = firebase.database().ref(`links/${key}`);
        const timestamp = Date.now();
        const formattedTime = new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        }).format(timestamp);

        linkRef.set({
            title,
            url,
            internalUrl: `/topics/${topic}/${category}/${key}`,
            timestamp,
            topic,
            category: `${topic}_${category}`,
            categoryName,
            claps: 10,
            iframe
        });
        onAdd({
            key: key,
            title,
            url,
            claps: 10,
            internalUrl: `/topics/${topic}/${category}/${key}`,
            timestamp,
            formattedTime,
            iframe
        });

        setMessage('Link added, Thanks');
        setURL('');
    }

    function handleReady(props) {
        submitProps = props;
        setDisabled(false);
    }

    function handleURLChange(e) {
        setURL(e.target.value);
    }

    function handleMessageClose() {
        setMessage('');
    }

    return (
        <div className="mt24">
            <h2>Add a link</h2>
            <form className="form form--link" onSubmit={handleSubmit}>
                <LinkBox
                    url={url}
                    onChange={handleURLChange}
                    onReady={handleReady}
                />
                <div className="form__button">
                    <button className="button" disabled={disabled}>
                        Create
                    </button>
                </div>
            </form>
            <Message text={message} onClose={handleMessageClose} />
        </div>
    );
}
