import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import history from '../common/history';

export default function Menu({ items, pathname }) {
    function handleClick(path) {
        history.push(path);
    }

    return (
        <ul className="nav">
            {items.map(item => (
                <li key={item.path} className={pathname === item.path ? 'nav__item nav__item--active' : 'nav__item'} onClick={handleClick.bind(null, item.path)}>
                    <Link to={item.path}>{item.text}</Link>
                </li>
            ))}
        </ul>
    );
}

Menu.propTypes = {
    items: PropTypes.array,
    pathname: PropTypes.string
};
