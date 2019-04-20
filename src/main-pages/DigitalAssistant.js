// @flow
import React, { Component } from 'react';
import Iframe from 'react-iframe';

const DigitalAssistant = () => {
  return (
    <div>
      <h2>Digital Assistant</h2>
      <div><a href="https://riyadshauk.com/digital-assistant">A link to Digital Assistant Diagram Builder</a></div>
      <Iframe url="https://riyadshauk.com/digital-assistant"
        width="100%"
        height="700px"
        id="myId"
        className="myClassname"
        display="initial"
        position="relative"
        allowFullScreen/>
    </div>
  );
}

export default DigitalAssistant;