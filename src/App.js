import React, { Component } from 'react';

class App extends Component {
    componentDidMount() {
        if (window.adsbygoogle) {
            window.adsbygoogle.push({});
        }
    }

    render() {
        return (
            <div className="app">
                <div className="title">Curate Links</div>
                <div className="subtitle">
                    Organize knowledge and help others
                </div>
                <div className="soon">Coming Soon ...</div>
                <div className="ads">
                    <ins
                        className="adsbygoogle"
                        style={{ display: 'block' }}
                        data-ad-client={process.env.REACT_APP_AD_CLIENT}
                        data-ad-slot={process.env.REACT_APP_AD_SLOT}
                        data-ad-format="auto"
                        data-full-width-responsive="true"
                    />
                </div>
            </div>
        );
    }
}

export default App;
