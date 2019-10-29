// @flow
import React from 'react';
import Iframe from 'react-iframe';
import { AnchorContainer, IframeContainer } from '../styles';

const DigitalAssistant = () => {
  return (
    <div>
      <h2>Digital Assistant</h2>
      <AnchorContainer>
        <a href="https://riyadshauk.com/digital-assistant">A link to Digital Assistant Diagram Builder</a>
      </AnchorContainer>
      <IframeContainer>
        <Iframe url="https://riyadshauk.com/digital-assistant"
          width="100%"
          height="700px"
          display="initial"
          position="relative"
          allowFullScreen />
      </IframeContainer>
    </div>
  );
}

export default DigitalAssistant;