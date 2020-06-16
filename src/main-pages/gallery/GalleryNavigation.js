// @flow
// $FlowFixMe
import React, { ReactElement } from 'react';
import styled from 'styled-components';

const GalleryNavigation = styled.div`
  overflow-y: scroll;
  overflow-x: hidden;
  overflow-wrap: break-word;
  border-right: 0.5rem dashed blue;
  padding-right: 1rem;
`;

// https://css-tricks.com/how-to-make-a-css-only-carousel/

type GalleryNavigationProps = {
  galleryNavigation: ReactElement,
};

export default ({ galleryNavigation }: GalleryNavigationProps) => (
  <GalleryNavigation>
    {
      galleryNavigation
    }
  </GalleryNavigation>
);