import React, { useState } from 'react';
import firebase from '../common/firebase';
import Message from '../common/Message';

export default function CreateTopic(props) {
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [meta, setMeta] = useState('');
    const [error, setError] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        if (name && slug && meta) {
            const topicRef = firebase
                .database()
                .ref(`topics/${slug}`);
            topicRef.once('value', function(snapshot) {
                if (snapshot.exists()) {
                    setError('Slug is not unique');
                } else {
                    topicRef.set({
                        name,
                        slug,
                        meta
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

    function handleMetaChange(e) {
        setMeta(e.target.value);
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
                <textarea
                    className="text"
                    placeholder="Meta"
                    onChange={handleMetaChange}
                />
                <div className="form__button">
                    <button className="button">Create</button>
                </div>
            </form>
            <Message {...messageProps} onClose={handleMessageClose} />
        </div>
    );
}
