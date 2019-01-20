import React, { useState, useEffect } from 'react';
import firebase from '../common/firebase';

export default function Page(props) {
    const [title, setTitle] = useState('');
    const [claps, setClaps] = useState(0);
    const [url, setURL] = useState('');

    const { page } = props.match.params;
    useEffect(
        () => {
            firebase
                .database()
                .ref(`/links/${page}`)
                .once('value')
                .then(snapshot => {
                    setTitle(snapshot.child('title').val());
                    setClaps(snapshot.child('claps').val());
                    setURL(snapshot.child('url').val());
                });
        },
        [page]
    );

    function handleClap() {
        setClaps(claps + 1);
        firebase
            .database()
            .ref(`/links/${page}/claps`)
            .set(claps + 1);
    }

    function handleNavigate() {
        window.open(url, '__blank');
    }

    return (
        <div className="page">
            <div className="page__header">
                <div className="page__header__title">{title}</div>
                <div className="page__header__claps">{claps} claps</div>
                <div className="page__header__clap">
                    <button className="button" onClick={handleClap}>
                        Clap
                    </button>
                </div>
                <div className="page__header__visit">
                    <button className="button" onClick={handleNavigate}>
                        Visit
                    </button>
                </div>
            </div>
            <div className="page__content">
                <iframe src={url} title={title} />
            </div>
        </div>
    );
}
