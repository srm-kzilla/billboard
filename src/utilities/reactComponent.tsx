import React from 'react';
import config from '../config';

const Component = (props) => {
  return (
    <div style={{ backgroundImage: `url('http://localhost:${config.port}/assets/${props.template}')`, height:'100%', width:'100%', margin: '-8px' }}>
      <h1 style={{ color: props.theme == 'dark' ? 'white' : 'black', width: '100%' }}>{props.title}</h1>
      <h2 style={{ color: props.theme == 'dark' ? 'white' : 'black', width: '100%'}}>{props.subtitle}</h2>
    </div>
  );
};

export default Component;
