// @flow
import React, { Component } from 'react';
import Iframe from 'react-iframe';

const FamilyPhotos = () => {
  return (
    <div>
      <h2>FamilyPhotos</h2>
      <div><a href="https://riyadshauk.com/photos">A link to a full-stack photo-sharing app I wrote for family use.</a></div>
      <Iframe url="https://riyadshauk.com/photos"
        width="700px"
        height="700px"
        id="myId"
        className="myClassname"
        display="initial"
        position="relative"
        allowFullScreen/>
    </div>
  );
}

export default FamilyPhotos;