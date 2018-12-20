import React from 'react';
import PropTypes from 'prop-types';

export default function requireAuth(BaseComponent) {
    function AuthComponent(props) {
        let userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            userInfo = JSON.parse(userInfo);
            const expiryTime = userInfo.loginTime + 3600000;
            if (Date.now() < expiryTime) {
                return <BaseComponent {...props} />;
            } else {
                localStorage.removeItem('userInfo');
            }
        }
        const {
            history,
            location: { pathname, search }
        } = props;
        const redirectUrl = `${pathname}${search}`;
        if (redirectUrl === '/') {
            history.push('/login');
        } else {
            history.push(
                '/login?redirectUrl=' + encodeURIComponent(redirectUrl)
            );
        }

        return null;
    }

    AuthComponent.propTypes = {
        history: PropTypes.object,
        location: PropTypes.object
    }

    return AuthComponent;
}
