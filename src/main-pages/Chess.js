// @flow
import React from 'react';
import Iframe from 'react-iframe';
import { AnchorContainer, IframeContainer } from '../styles';
import chessgameplay from '../assets/chessplay.gif';

const Chess = () => {
  return (
    <div>
      <h2>Chess</h2>
      <AnchorContainer>
        <a href="https://riyadshauk.com/chess">A link to a (client-side only) chess game I wrote</a>
      </AnchorContainer>
      <IframeContainer>
        <Iframe url="https://riyadshauk.com/chess"
          width="700px"
          height="700px"
          display="initial"
          position="relative"
          allowFullScreen />
      </IframeContainer>
      <img className="chessgameplay" src={chessgameplay} alt="chess gameplay example" />
    </div>
  );
}

export default Chess;