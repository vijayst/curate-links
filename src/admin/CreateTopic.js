import React from 'react';

export default function CreateTopic() {

    function handleSubmit(e) {
        e.preventDefault();
    }

    return (
        <div>
            <h1>Create Topic</h1>
            <form className="topic-form" onSubmit={handleSubmit}>
                <input type="text" className="text" placeholder="Topic name"></input>
                <input type="text" className="text" placeholder="Slug"></input>
                <textarea className="text" placeholder="Meta" />
                <div className="topic-form__button">
                    <button className="button">Create</button>
                </div>
            </form>
        </div>
    );
}