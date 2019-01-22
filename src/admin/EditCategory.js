import React, { useState, useEffect } from 'react';
import firebase from '../common/firebase';
import Message from '../common/Message';
import LinkBox from '../common/LinkBox';

let submitProps;
let oldURL;

export default function EditCategory(props) {
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

    const { topic, category } = props.match.params;

    useEffect(
        () => {
            const categoryRef = firebase
                .database()
                .ref(`topics/${topic}/categories/${category}`);
            categoryRef.once('value').then(snapshot => {
                setName(snapshot.child('name').val());
                setSlug(category);
                oldURL = snapshot.child('url').val();
                setURL(oldURL);
            });
        },
        [topic, category]
    );

    function handleSubmit(e) {
        e.preventDefault();
        if (name && slug) {
            const categoryRef = firebase
                .database()
                .ref(`topics/${topic}/categories/${slug}`);

            categoryRef.once('value').then(snapshot => {
                if (snapshot.exists() && slug !== category) {
                    setError('Slug is not unique');
                } else {
                    if (oldURL === url) {
                        categoryRef.set({
                            name,
                            slug
                        });
                    } else if (!submitProps) {
                        setError('Fetch the new URL to update');
                    } else {
                        const { url, title, description, image } = submitProps;
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
                <LinkBox
                    url={url}
                    onChange={handleChange}
                    onReady={handleReady}
                />
                <div className="form__button">
                    <button className="button" disabled={disabled}>
                        Update
                    </button>
                </div>
            </form>
            <Message {...messageProps} onClose={handleMessageClose} />
        </div>
    );
}
