// @flow
import React from 'react';
import Iframe from 'react-iframe';
import { AnchorContainer, IframeContainer } from '../styles';

const FamilyPhotos = () => {
  return (
    <div>
      <h2>FamilyPhotos</h2>
      <AnchorContainer>
        <a href="https://riyadshauk.com/photos">A link to a full-stack photo-sharing app I wrote for family use.</a>
      </AnchorContainer>
      <IframeContainer>
        <Iframe url="https://riyadshauk.com/photos"
          width="700px"
          height="700px"
          display="initial"
          position="relative"
          allowFullScreen />
      </IframeContainer>
    </div>
  );
}

export default FamilyPhotos;