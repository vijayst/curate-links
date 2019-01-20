import React, { useState } from 'react';
import firebase from '../common/firebase';
import Message from '../common/Message';

export default function CreateCategory(props) {
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [meta, setMeta] = useState('');
    const [error, setError] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        const { topic } = props.match.params;
        if (name && slug && meta) {
            const categoryRef = firebase
                .database()
                .ref(`topics/${topic}/categories/${slug}`);
            
            categoryRef.once('value')
            .then(snapshot => {
                if (snapshot.exists()) {
                    setError('Slug is not unique');
                } else {
                    categoryRef.set({
                        name,
                        slug,
                        meta
                    });
                    setError('');
                    props.history.push(`/admin/topics/${topic}`);
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
            <h1>Create Category</h1>
            <form className="form form--category" onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="text"
                    placeholder="Category name"
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
