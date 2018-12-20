import React, { useEffect } from 'react';

export default function Message(props) {
    useEffect(
        () => {
            if (props.text) {
                const timeout = setTimeout(() => {
                    props.onClose();
                }, 5000);
                return () => {
                    clearTimeout(timeout);
                };
            }
        },
        [props.text]
    );

    return props.text ? (
        <div className={props.error ? 'message message--error' : 'message'}>
            {props.text}
        </div>
    ) : null;
}
