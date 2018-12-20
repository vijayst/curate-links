import React from 'react';

export default function Message(props) {
    return props.text ? (
        <div className={props.error ? 'message message--error' : 'message'}>
            {props.text}
        </div>
    ) : null;
}