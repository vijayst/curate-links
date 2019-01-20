import React from 'react'

const Expand = props => (
  <svg viewBox="0 0 512 512" fill="currentColor" {...props}>
    <title />
    <g data-name={1}>
      <path d="M441.13 166.52h-372a15 15 0 1 1 0-30h372a15 15 0 0 1 0 30zM441.13 279.72h-372a15 15 0 1 1 0-30h372a15 15 0 0 1 0 30zM441.13 392.92h-372a15 15 0 1 1 0-30h372a15 15 0 0 1 0 30z" />
    </g>
  </svg>
)

Expand.defaultProps = {
    width: 16,
    height: 16
}

export default Expand;