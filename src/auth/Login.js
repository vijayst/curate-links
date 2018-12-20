import React, { useState } from 'react';
import firebase from '../common/firebase';
import Message from '../common/Message';
import history from '../common/history';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [messageProps, setMessageProps] = useState({});

    function handleSubmit(e) {
        e.preventDefault();
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(response => {
                const { uid, email, qa } = response;
                localStorage.setItem('userInfo', JSON.stringify({ uid, email, qa }));
                history.push('/admin');
            })
            .catch(() => {
                setMessageProps({ error: true, text: 'Incorrect email or password' });
            });
    }

    function handleEmailChange(e) {
        setEmail(e.target.value);
        setDisabled(!(e.target.value && password));
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
        setDisabled(!(e.target.value && email));
    }

    function handleMessageClose() {
        setMessageProps({});
    }

    return (
        <div className="login">
            <form onSubmit={handleSubmit}>
                <div className="title">Login</div>
                <input autoFocus type="text" className="textbox" placeholder="email" onChange={handleEmailChange} />
                <input
                    type="password"
                    className="textbox"
                    placeholder="password"
                    onChange={handlePasswordChange}
                />
                <div className="login__button">
                    <button className="button" disabled={disabled}>Login</button>
                </div>
            </form>
            <Message {...messageProps} onClose={handleMessageClose} />
        </div>
    );
}
