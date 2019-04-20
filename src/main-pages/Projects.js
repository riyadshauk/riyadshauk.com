// @flow
import React, { Component } from 'react';
import {
  Route,
  Link,
  Switch
} from 'react-router-dom';
import FamilyPhotosWalkthrough from '../family-photos-presentation/FamilyPhotosWalkthrough';
import Chess from './Chess';
import FamilyPhotos from './FamilyPhotos';
import DigitalAssistant from './DigitalAssistant';

type Match = {
  url: string,
  path: string,
  params: any,
  // and more that idk about...
};

const Projects = ({ match }: { match: Match }) => {
  return (
    <div>
      <h2>Projects</h2>
      <ul>
        <li>
          <Link to={`${match.url}/digital-assistant`}>[Oracle] Digital Assistant Diagram Builder: A graphic (React/Redux), drag-and-drop-based YAML generator</Link>
        </li>
        <li>
          <Link to={`${match.url}/chess`}>Chess: A Client-side Chess Game written in TypeScript</Link>
        </li>
        <li>
          <Link to={`${match.url}/photos`}>Family Photos App (React + Express + Postgres)</Link>
        </li>
        <li>
          <Link to={`${match.url}/family-photos-walkthrough`}>Family Photos Walkthrough: A walkthrough of a full-stack Express + React app I recently built</Link>
        </li>
      </ul>

      {/* <Route path={`${match.path}/:projectId`} component={Project} /> */}
      <Switch>
        {console.log('${match.path}/family-photos-walkthrough:', `${match.path}/family-photos-walkthrough`)}
        <Route path={`${match.path}/family-photos-walkthrough`} component={FamilyPhotosWalkthrough} />
        <Route path={`${match.path}/chess`} component={Chess} />
        <Route path={`${match.path}/digital-assistant`} component={DigitalAssistant} />
        <Route path={`${match.path}/photos`} component={FamilyPhotos} />
        <Route
          exact
          path={match.path}
          render={() => <h3>Please select a project.</h3>}
        />
      </Switch>
    </div>
  );
}

export default Projects;