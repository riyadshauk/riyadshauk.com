// @flow
import React, { Component } from 'react';
import {
  Route,
  Link,
  Switch
} from 'react-router-dom';
import FamilyPhotosWalkthrough from '../family-photos-presentation/FamilyPhotosWalkthrough';
import Chess from './Chess';

type Match = {
  url: string,
  path: string,
  params: any,
  // and more that idk about...
};

const Projects = ({ match }: { match : Match }) => {
  return (
    <div>
      <h2>Projects</h2>
      <ul>
        <li>
          <Link to={`${match.url}/chess`}>Chess: A Client-side Chess Game written in TypeScript</Link>
        </li>
        <li>
          <Link to={`${match.url}/family-photos-presentation`}>Family Photos Presentation: A walkthrough of a full-stack Express + React app I recently built</Link>
        </li>
      </ul>

      {/* <Route path={`${match.path}/:projectId`} component={Project} /> */}
      <Switch>
        { console.log('${match.path}/family-photos-presentation:', `${match.path}/family-photos-presentation`) }
        <Route path={`${match.path}/family-photos-presentation`} component={FamilyPhotosWalkthrough} />
        <Route path={`${match.path}/chess`} component={Chess} />
        <Route
          exact
          path={match.path}
          render={() => <h3>Please select a project.</h3>}
        />
      </Switch>
    </div>
  );
}

// const Project = ({ match }: { match : Match }) => {
//   return (
//     <div>
//       <h3>{match.params.projectId}</h3>
//     </div>
//   );
// }

export default Projects;