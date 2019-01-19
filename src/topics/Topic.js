import React, { useEffect } from 'react';
import firebase from '../common/firebase';

export default function Topic(props) {
    const { topic } = props.match.params;
    const { name } = props;
    useEffect(() => {
        firebase
            .database()
            .ref(`links`)
    }, []);

    return (
        <h1>{name}</h1>
    );
}