import React from 'react';

export default function Header(props) {
    const { page } = props.params;
    if (!page) return null; 
    return (
        <div>{page}</div>
    );
}