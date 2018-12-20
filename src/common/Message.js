import React, { useEffect } from 'react';
import { Animate } from 'react-move';
import PropTypes from 'prop-types';

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

    return (
        <Animate
            show={!!props.text}
            start={{
                opacity: 0,
                className: props.error ? 'message message--error' : 'message',
                text: props.text
            }}
            enter={{
                opacity: [1],
                timing: {
                    duration: 300
                }
            }}
            leave={{
                opacity: [0],
                timing: {
                    duration: 150
                }
            }}
        >
            {({ opacity, className, text }) => (
                <div
                    style={{ opacity }}
                    className={className}
                >
                    {text}
                </div>
            )}
        </Animate>
    );
}

Message.propTypes = {
    text: PropTypes.string,
    error: PropTypes.bool,
    onClose: PropTypes.func
}
