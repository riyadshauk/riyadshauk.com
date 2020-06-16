// @flow
// $FlowFixMe
import React, { ReactElement } from 'react';
import styled from 'styled-components';
import GalleryNavigation from './GalleryNavigation';
import GalleryContent from './GalleryContent';

/**
 * @description This is the 'wrapper' for the navigation and content
 * of the gallery.
 */
const Gallery = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr;
  grid-gap: 1.2rem;
  overflow: hidden;
  height: 90vh;
`;

// https://css-tricks.com/how-to-make-a-css-only-carousel/

type GalleryProps = {
  galleryNavigation: ReactElement,
  galleryContent: ReactElement,
};

export default ({ galleryNavigation, galleryContent }: GalleryProps) => (
  <Gallery>
    <GalleryNavigation galleryNavigation={galleryNavigation} />
    <GalleryContent galleryContent={galleryContent} />
  </Gallery>
);