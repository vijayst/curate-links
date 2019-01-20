import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="home">
            <div className="home__inner">
                <div className="home__inner__title">Curate Links</div>
                <div className="home__inner__github">
                    <a href="https://github.com/vijayst/curate-links">GitHub</a>
                </div>
                <div className="home__inner__demo">
                    <Link to="/topics/react">React</Link>
                </div>
            </div>
        </div>
    );
}
