import React from 'react';
import config from '../config';
import { getCssCode } from './sharedUtilities';

const Component = (props) => {
  const customText = props.custom?"This OG Image is made by Billboard, a quality product from SRMKZILLA":"";
  const css = getCssCode();
  return (
    <html>
      <head>
  <style>{css}</style>
    </head>
      <body style={{ backgroundImage: `url('http://127.0.0.1:${config.port}/assets/${props.template}')`, backgroundSize: 'cover', position: 'relative' }}>
        <p style={{ color: props.theme == 'dark' ? 'white' : 'black', fontSize: props.fontSize }} id='title'>{props.title}</p>
        <p style={{ color: props.theme == 'dark' ? 'white' : 'black'}} id='subtitle'>{props.subtitle}</p>
        <p style={{ color: props.theme == 'dark' ? 'white' : 'black'}} id='customText'>{customText}</p>
      </body>
    </html>
  );
};

export default Component;
