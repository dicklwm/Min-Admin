import React from 'react';

function Iframe ({ src, height }) {
  return (
    <iframe
      src={src}
      frameBorder="0"
      width="100%"
      height={height + 'px'}
      style={{"marginBottom":"-24px"}}
    >

    </iframe>
  );
}

export default Iframe;
