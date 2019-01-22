import React, { useState } from 'react';
import firebase from '../common/firebase';
import Message from '../common/Message';
import LinkBox from '../common/LinkBox';

let submitProps;

export default function CreateTopic(props) {
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [url, setURL] = useState('');
    const [error, setError] = useState('');
    const [disabled, setDisabled] = useState(false);

    function handleChange(e) {
        setURL(e.target.value);
        setDisabled(true);
    }

    function handleReady(props) {
        submitProps = props;
        setDisabled(false);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (name && slug) {
            const topicRef = firebase
                .database()
                .ref(`topics/${slug}`);
            topicRef.once('value', function(snapshot) {
                if (snapshot.exists()) {
                    setError('Slug is not unique');
                } else {
                    const { url, title, description, image } = submitProps;
                    topicRef.set({
                        name,
                        slug,
                        url,
                        title,
                        description,
                        image
                    });
                    setError('');
                    props.history.push(`/admin/topics/${slug}`);
                }
            });
        } else {
            setError('All fields are required');
        }
    }

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleSlugChange(e) {
        setSlug(e.target.value);
    }

    function handleMessageClose() {
        setError('');
    }

    let messageProps = {};
    if (error) {
        messageProps = {
            error: true,
            text: error
        };
    }

    return (
        <div>
            <h1>Create Topic</h1>
            <form className="form form--topic" onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="text"
                    placeholder="Topic name"
                    onChange={handleNameChange}
                />
                <input
                    type="text"
                    className="text"
                    placeholder="Slug"
                    onChange={handleSlugChange}
                />
                <LinkBox 
                    url={url}
                    onChange={handleChange}
                    onReady={handleReady}
                />
                <div className="form__button">
                    <button className="button" disabled={disabled}>Create</button>
                </div>
            </form>
            <Message {...messageProps} onClose={handleMessageClose} />
        </div>
    );
}
