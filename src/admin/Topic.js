import React, { useState, useEffect } from 'react';
import firebase from '../common/firebase';
import history from '../common/history';

export default function Topic(props) {
    const [name, setName] = useState('');
    const { topic } = props.match.params;

    useEffect(() => {
        firebase.database().ref(`/topics/${topic}`).once('value', function(snapshot) {
            setName(snapshot.val().name);
        });
    }, [topic]);

    function handleNavigate() {
        history.push(`/admin/topics/${topic}/categories/create`);
    }

    return (
        <div className="topic">
            <h1>{name}</h1>
            <button className="button topic__create" onClick={handleNavigate}>Create Category</button>
            <table className="topic__categories">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Slug</th>
                        <th>Meta</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colSpan={5}>
                            No categories to display!
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}