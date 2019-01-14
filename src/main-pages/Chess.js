// @flow
import React, { Component } from 'react';
import Iframe from 'react-iframe';

const Chess = () => {
  return (
    <div>
      <h2>Chess</h2>
      <div><a href="https://riyadshauk.com/chess">A link to a (client-side only) chess game I wrote</a></div>
      <Iframe url="https://riyadshauk.com/chess"
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

export default Chess;