import React from 'react';

const Component = props => {
  return (
    <div style={{ backgroundImage: `url(${props.config.template})`, justifyContent: 'center', alignItems: 'center' }}>
      <h1 style={{ color: props.config.theme == 'dark' ? 'white' : 'black' }}>{props.config.title}</h1>
      <h2 style={{ color: props.config.theme == 'dark' ? 'white' : 'black' }}>{props.config.subTitle}</h2>
    </div>
  );
};

export default Component;
