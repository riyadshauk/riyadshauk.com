// @flow
// $FlowFixMe
import React, { ReactElement } from 'react';
import styled from 'styled-components';
// eslint-disable-next-line no-unused-vars
import styles from './gallery-content.css';

const GalleryContent = styled.div`
  overflow: scroll;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  padding-right: 1rem;
`;

// https://css-tricks.com/how-to-make-a-css-only-carousel/

type GalleryContentProps = {
  galleryContent: ReactElement,
};

export default ({ galleryContent }: GalleryContentProps) => {
  return (
    <GalleryContent className="gallery-content">
      {
        galleryContent
      }
    </GalleryContent>
  )
};