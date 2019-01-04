import React from 'react';
import { Link } from 'react-router-dom';

export default function Admin() {
    return (
        <div className="admin">
            <header className="admin__header">
                Curate Links
            </header>
            <aside className="admin__nav">
                <ul className="nav">
                    <li className="nav__item"><Link to="/admin/topic/create">Create Topic</Link></li>
                    <li className="nav__item"><Link to="/admin/settings">Settings</Link></li>
                </ul>
            </aside>
            <main className="admin__content">

            </main>
            <footer className="admin__footer">
                &copy;2019, All rights reserved
            </footer>
        </div>
    );
}