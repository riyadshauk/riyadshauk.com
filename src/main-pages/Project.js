// @flow
import React, { Fragment } from 'react';
import Iframe from 'react-iframe';
import { AnchorContainer, IframeContainer } from '../styles';

export const ProjectLink = ({url}: {url: string}) => (
  <AnchorContainer>
    <a href={url}>{url}</a>
  </AnchorContainer>
);

export const ProjectIFrame = ({url}: {url: string}) => (
  <Fragment>
    <IframeContainer>
      <Iframe url={url}
        width="100%"
        height="700px"
        display="initial"
        position="relative"
        allowFullScreen />
    </IframeContainer>
  </Fragment>
);

const Project = (name: string, url: string) => {
  return (
    <Fragment>
      <h2>{name}</h2>
      <ProjectLink url={url} />
      <ProjectIFrame url={url} />
    </Fragment>
  );
}

export default Project;