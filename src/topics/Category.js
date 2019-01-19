import React, { useState, useEffect } from 'react';
import firebase from '../common/firebase';

export default function Category(props) {
    const [name, setName] = useState('');
    const { topic, category } = props.match.params;

    useEffect(() => {
        firebase
            .database()
            .ref(`/topics/${topic}/categories/${category}`)
            .once('value')
            .then(snapshot => {
                setName(snapshot.child('name').val());
            });
    }, [category]);

    return (
        <h1>{name}</h1>
    );
}