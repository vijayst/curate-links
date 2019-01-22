import React, { useState } from 'react';
import firebase from '../common/firebase';
import Message from '../common/Message';
import LinkBox from '../common/LinkBox';

let submitProps;

export default function CreateCategory(props) {
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [url, setURL] = useState('');
    const [error, setError] = useState('');
    const [disabled, setDisabled] = useState(true);

    function handleChange(e) {
        setURL(e.target.value);
    }

    function handleReady(props) {
        submitProps = props;
        setDisabled(false);
    }

    function handleSubmit(e) {
        e.preventDefault();
        const { topic } = props.match.params;
        if (name && slug) {
            const categoryRef = firebase
                .database()
                .ref(`topics/${topic}/categories/${slug}`);
            
            categoryRef.once('value')
            .then(snapshot => {
                if (snapshot.exists()) {
                    setError('Slug is not unique');
                } else {
                    const { title, description, image, url } = submitProps;
                    categoryRef.set({
                        name,
                        slug,
                        title,
                        description,
                        image,
                        url
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
