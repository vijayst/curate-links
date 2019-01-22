import React, { useState, Fragment } from 'react';
import Message from './Message';
import firebase from '../common/firebase';
import axios from 'axios';

export default function LinkBox(props) {
    const [visible, setVisible] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [error, setError] = useState('');
    const { url, onReady, onChange } = props;

    function getKeyFromURL(url) {
        let key = url
            .replace('https://', '')
            .replace('http://', '')
            .replace(/\./g, '_')
            .replace(/\//g, '__');
        const end = key.indexOf('?');
        if (end > 0) {
            key = key.substring(0, end);
        }
        return key;
    }

    function handleFetch() {
        if (url) {
            const regex = /https?:\/\/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
            if (!regex.test(url)) {
                setError('URL is not valid');
                return;
            }
            const key = getKeyFromURL(url);
            const linkRef = firebase.database().ref(`links/${key}`);
            linkRef.once('value', function(snapshot) {
                if (snapshot.exists()) {
                    setError('Link already exists');
                } else {
                    let iframe;
                    axios
                        .get(`${process.env.REACT_APP_FUNCTIONS_URL}valid?url=${url}`)
                        .then(response => {
                            const { valid } = response.data;
                            if (!valid) {
                                setError('Link does not exist!');
                            } else {
                                ({ iframe } = response.data);
                                return axios.get(
                                    `${process.env.REACT_APP_FUNCTIONS_URL}meta?url=${url}`
                                );
                            }
                        })
                        .then(response => {
                            const { title, description, image } = response.data;
                            onReady({
                                url,
                                key,
                                title,
                                description,
                                image,
                                iframe
                            });
                            setVisible(true);
                            setTitle(title);
                            setDescription(description);
                            setImage(image);
                            setError('');
                        });
                }
            });
        } else {
            setError('Please enter URL');
        }
    }

    function handleMessageClose() {
        setError('');
    }

    return (
        <div className="linkbox">
            <input
                type="text"
                className="text linkbox__url"
                placeholder="https://www.google.com"
                readOnly={visible}
                value={url}
                onChange={onChange}
            />
            <button
                type="button"
                className="button linkbox__fetch"
                onClick={handleFetch}
                disabled={visible}
            >
                Fetch
            </button>
            {visible && (
                <Fragment>
                    <img className="linkbox__img" alt="URL Preview" src={image} />
                    <div className="linkbox__title">{title}</div>
                    <div className="linkbox__meta">{description}</div>
                </Fragment>
            )}
            <Message text={error} error  onClose={handleMessageClose} />
        </div>
    );
}
