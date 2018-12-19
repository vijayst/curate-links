import React from 'react';

export default function Login() {
    return (
        <form>
            <div className="title">Login</div>
            <input type="text" className="textbox" placeholder="email" />
            <input type="password" className="textbox" placeholder="password" />
            <button className="button">Login</button>
        </form>
    );
}