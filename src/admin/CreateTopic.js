import React, { useState } from 'react';
import firebase from '../common/firebase';

export default function CreateTopic() {
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [meta, setMeta] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        const topicRef = firebase.database().ref('topics').push();
        topicRef.set({
            name,
            slug,
            meta
        });
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

    return (
        <div>
            <h1>Create Topic</h1>
            <form className="topic-form" onSubmit={handleSubmit}>
                <input type="text" className="text" placeholder="Topic name" onChange={handleNameChange}></input>
                <input type="text" className="text" placeholder="Slug" onChange={handleSlugChange}></input>
                <textarea className="text" placeholder="Meta" onChange={handleMetaChange} />
                <div className="topic-form__button">
                    <button className="button">Create</button>
                </div>
            </form>
        </div>
    );
}