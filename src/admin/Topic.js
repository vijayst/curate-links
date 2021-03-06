import React, { useState, useEffect } from 'react';
import firebase from '../common/firebase';
import history from '../common/history';

export default function Topic(props) {
    const [name, setName] = useState('');
    let [categories, setCategories] = useState([]);

    const { topic } = props.match.params;

    useEffect(
        () => {
            firebase
                .database()
                .ref(`/topics/${topic}`)
                .once('value', function(snapshot) {
                    setName(snapshot.val().name);
                    const categories = [];
                    snapshot.child('categories').forEach(s => {
                        categories.push({
                            name: s.child('name').val(),
                            slug: s.child('slug').val(),
                            description: s.child('description').val()
                        });
                    });
                    setCategories(categories);
                });
        },
        [topic]
    );

    function handleDelete(category) {
        firebase
                .database()
                .ref(`/topics/${topic}/categories/${category}`)
                .remove()
                .then(() => {
                    categories = categories.slice();
                    const index = categories.findIndex(c => c.slug === category);
                    categories.splice(index, 1);
                    setCategories(categories);
                });
    }

    function handleEdit(category) {
        history.push(`/admin/topics/${topic}/categories/${category}`);
    }

    function handleNavigate() {
        history.push(`/admin/topics/${topic}/categories/create`);
    }

    return (
        <div className="topic">
            <h1>{name}</h1>
            <button className="button topic__create" onClick={handleNavigate}>
                Create Category
            </button>
            <table className="topic__categories">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Slug</th>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.length ? (
                        categories.map(c => (
                            <tr key={c.slug}>
                                <td>{c.name}</td>
                                <td>{c.slug}</td>
                                <td>{c.description}</td>
                                <td><button
                                        className="button"
                                        onClick={handleEdit.bind(
                                            this,
                                            c.slug
                                        )}
                                    >
                                        Edit
                                    </button></td>
                                <td>
                                    <button
                                        className="button"
                                        onClick={handleDelete.bind(
                                            this,
                                            c.slug
                                        )}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5}>No categories to display!</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
