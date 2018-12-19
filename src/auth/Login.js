import React from 'react';

export default function Login() {
    function handleSubmit(e) {
        e.preventDefault();
    }

    return (
        <div className="login">
            <form onSubmit={handleSubmit}>
                <div className="title">Login</div>
                <input type="text" className="textbox" placeholder="email" />
                <input
                    type="password"
                    className="textbox"
                    placeholder="password"
                />
                <div className="login__button">
                    <button className="button" disabled>Login</button>
                </div>
            </form>
        </div>
    );
}
