import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="home">
            <div className="home__main">
                <div className="home__circle">
                    <div className="home__inner">
                        <div className="home__inner__title">Curate Links</div>
                        <div className="home__inner__github">
                            <a href="https://github.com/vijayst/curate-links">
                                GitHub
                            </a>
                        </div>
                        <div className="home__inner__demo">
                            <Link to="/topics/react">React</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="home__benefits">
                <div className="home__benefit">
                    Curate Links allows you to select a topic to curate. Within a topic, create multiple categories.
                    The topic and all categories are publicly available as web pages.
                </div>
                <div className="home__benefit">
                    Curate Links allows you or the community to add links. Other users can recommend the link by clapping on it. 
                    The most clapped link will be considered reference links for the topic. 
                </div>
                <div className="home__benefit">
                    The entire product is available on GitHub to build trust with the community. Currently, there is only one topic available.
                    The topic is on React and allows the React community to curate links on React.
                </div>
            </div>
        </div>
    );
}
