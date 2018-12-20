import React, { useState } from 'react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [disabled, setDisabled] = useState(true);

    function handleSubmit(e) {
        e.preventDefault();
    }

    function handleEmailChange(e) {
        setEmail(e.target.value);
        setDisabled(!(e.target.value && password));
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
        setDisabled(!(e.target.value && email));
    }

    return (
        <div className="login">
            <form onSubmit={handleSubmit}>
                <div className="title">Login</div>
                <input autofocus type="text" className="textbox" placeholder="email" onChange={handleEmailChange} />
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
        </div>
    );
}
