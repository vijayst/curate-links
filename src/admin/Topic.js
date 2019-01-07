import React, { useState, useEffect } from 'react';
import firebase from '../common/firebase';

export default function Topic(props) {
    const [name, setName] = useState('');
    useEffect(() => {
        firebase.database().ref(`/topics/${props.match.params.topic}`).once('value', function(snapshot) {
            setName(snapshot.val().name);
        });
    }, []);

    return (
        <div className="topic">
            <h1>{name}</h1>
            <button className="button topic__create">Create Category</button>
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