// @flow
import React, { Fragment } from 'react';
import chessgameplay from '../assets/chessplay.gif';
import digitalAssistantScreenshot from '../assets/digital-assistant-screenshot.png';
import trendingNewsDemo from '../assets/trending-news-demo.gif';
import { ProjectLink, ProjectIFrame } from './Project';
import Gallery from './gallery/Gallery';
import { Page } from '../styles';

const projects = [
  {
    name: 'Trending World News',
    url: 'https://riyadshauk.com/news',
    thumbnail: trendingNewsDemo,
    path: 'news',
  },
  {
    name: 'Chess Game',
    url: 'https://riyadshauk.com/chess',
    thumbnail: chessgameplay,
    path: 'chess',
  },
  {
    name: 'Digital Assistant Builder (React/Redux)',
    url: 'https://riyadshauk.com/digital-assistant',
    thumbnail: digitalAssistantScreenshot,
    path: 'digital-assistant',
  },
];

const ProjectThumbnails = () => (
  <Fragment>
    {
      projects.map(({ thumbnail, name, url, path }, key) => (
        <a href={`#${path}`}>
          <ProjectLink url={url} />
          <img src={thumbnail} alt="" key={key} />
        </a>
      ))
    }
  </Fragment>
);

const GalleryContent = () => (
  <Fragment>
    {
      projects.map(({ url, name, path }, key) => (
        <div id={path}>
          <ProjectIFrame url={url} key={key} className="iframe" />
        </div>
      ))
    }
  </Fragment>
);

const ProjectGallery = () => {
  return (
    <Page>
      <h2>Projects</h2>
      <Gallery
        galleryNavigation={ProjectThumbnails()}
        galleryContent={GalleryContent()} />
    </Page>
  );
}

export default ProjectGallery;