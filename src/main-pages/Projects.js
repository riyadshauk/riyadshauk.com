// @flow
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Page } from '../styles';
import chessgameplay from '../assets/chessplay.gif';
import digitalAssistantScreenshot from '../assets/digital-assistant-screenshot.png';
import { ProjectLink, ProjectIFrame } from './Project';

const projects = [
  {
    name: 'Chess Game',
    url: 'https://riyadshauk.com/chess',
    thumbnail: chessgameplay,
  },
  {
    name: 'Digital Assistant Builder (React/Redux)',
    url: 'https://riyadshauk.com/digital-assistant',
    thumbnail: digitalAssistantScreenshot,
  },
];

export const ProjectsContainer = styled.div`
  display: flex;
  width: 100%;
`;

export const Sidebar = styled.div`
  min-width: 300px;
  overflow: auto;
`;

export const ProjectThumbnails = styled.div`
  position: fixed;
  min-width: 300px;
  overflow: auto;
`;

export const ProjectThumbnailContainer = styled.div`
  padding-bottom: 20px;
  width: 100%;
`;

export const ProjectDescriptionContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  &:hover: { /* TODO */
    cursor: pointer;
    background-color: green;
  }
`;

export const ProjectThumbnail = styled.img`
  height: 150px;
`;

const ProjectItems = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ProjectItem = styled.div`
  padding-bottom: 20px;
  width: 100%;
`;

type ProjectDescriptionContainerProps = {
  name: string,
  url: string,
  thumbnail: string,
};

const ProjectDescriptionContainer = (props: ProjectDescriptionContainerProps) => {
  const { name, url, thumbnail } = props;
  const [ projectContainer, setProjectContainer ] = useState(null);
  useEffect(() => {
    setProjectContainer(document.getElementById(url));
  }, [url]);
  const projectSelected = () => {
    console.log('ProjectDescriptionContainerDiv has been clicked!!, this:', this);
    (projectContainer || { scrollIntoView: opts => undefined })
      .scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <ProjectDescriptionContainerDiv
      onMouseOver={projectSelected}
    >
      {name}
      <ProjectThumbnailContainer>
        <ProjectThumbnail src={thumbnail} alt={`${name} image`} />
        <ProjectLink url={url} />
      </ProjectThumbnailContainer>
    </ProjectDescriptionContainerDiv>
  );
};

const Projects = () => {
  return (
    <ProjectsContainer>
      <Sidebar>
        <ProjectThumbnails>
          <Page>
            <h2>Projects</h2>
            {
              projects.map((projectDescriptionContainerProps: ProjectDescriptionContainerProps, idx) =>
                <ProjectDescriptionContainer {...projectDescriptionContainerProps} key={idx} />
              )
            }
          </Page>
        </ProjectThumbnails>
      </Sidebar>
      <ProjectItems>
        {
          // Mark each ProjectItem with id == url so it can be scrolled on mouse click in ProjectDescriptionContainer
          projects.map(({ url }: ProjectDescriptionContainerProps, idx) => (
            <ProjectItem key={idx} id={url}>
              <ProjectIFrame url={url} />
            </ProjectItem>
          ))
        }
      </ProjectItems>
    </ProjectsContainer>
  );
}

export default Projects;