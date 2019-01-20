import React, { useState, useEffect } from 'react';
import firebase from '../common/firebase';
import Message from '../common/Message';

export default function EditCategory(props) {
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [meta, setMeta] = useState('');
    const [error, setError] = useState('');

    const { topic, category } = props.match.params;

    useEffect(() => {
        const categoryRef = firebase
                .database()
                .ref(`topics/${topic}/categories/${category}`);
        categoryRef.once('value')
        .then(snapshot => {
            setName(snapshot.child('name').val());
            setSlug(category);
            setMeta(snapshot.child('meta').val());
        });
    }, [topic, category]);

    function handleSubmit(e) {
        e.preventDefault();
        if (name && slug && meta) {
            const categoryRef = firebase
                .database()
                .ref(`topics/${topic}/categories/${slug}`);
            
            categoryRef.once('value')
            .then(snapshot => {
                if (snapshot.exists() && slug !== category) {
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
            <h1>Edit Category</h1>
            <form className="form form--category" onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="text"
                    placeholder="Category name"
                    onChange={handleNameChange}
                    value={name}
                />
                <input
                    type="text"
                    className="text"
                    placeholder="Slug"
                    onChange={handleSlugChange}
                    value={slug}
                />
                <textarea
                    className="text"
                    placeholder="Meta"
                    onChange={handleMetaChange}
                    value={meta}
                />
                <div className="form__button">
                    <button className="button">Update</button>
                </div>
            </form>
            <Message {...messageProps} onClose={handleMessageClose} />
        </div>
    );
}
