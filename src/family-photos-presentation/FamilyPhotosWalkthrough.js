// @flow
import React, { Component } from 'react';
import {
  Route,
  Link
} from 'react-router-dom';

import AuthenticationWalkthrough from './AuthenticationWalkthrough';

type Match = {
  url: string,
  path: string,
  // and more that idk about...
};

const FamilyPhotosWalkthrough = ({ match }: { match : Match }) => {
  return (
    <div>
      <h2>Family Photos App Walkthrough</h2>
      <p>Written by Riyad Shauk on Tue Jan 08 2019 GMT-0800 (Pacific Standard Time)</p>
      <p>Last updated on Wed Jan 09 2019 21:50:55 GMT-0800 (Pacific Standard Time)</p>
      <h3>This project is a WIP and something I plan on using as a central location for storing and sharing family photos.</h3>
      <p>
        Down the road, I may consider integrating with (basically being able to upload to) 
        other popular photo-sharing services (such as Google Photos, Apple's iCloud, and Nixplay)
      </p>
      <p>
        A main goal of this project is to avoid vendor lock-in, and to have a full-stack, 
        open-source, self-hosted solution to storing ad sharing family photos. As such, when
         it comes to storing photos, I would like to make it as easy as possible to use and maintain 
         an existing photo folder hierarchy, without modifying its design just for this app 
         (ie to not do something like what Apple's Photos does to the underlying folder containing all the photos).
      </p>
      <p>
        I decided to use Express on the server-side, with React on the front-end since they're both easy to
        set up, maintain, and extend. They've also been very popular for the past several years, when it comes 
        to full-stack web applications.
      </p>
      <ul>
        <li>
          <Link to={`${match.url}/auth`}>How I implemented full-stack authentication</Link>
        </li>
      </ul>

      {/* <Route path={`${match.path}/:walkthroughId`} component={Walkthrough} /> */}
      <Route
        exact
        path={match.path}
        render={() => <h3>Please select a walkthrough.</h3>}
      />
      <Route path={`${match.url}/auth`} component={AuthenticationWalkthrough} />
    </div>
  );
}

// const Walkthrough = ({ match }) => {
//   return (
//     <div>
//       <h3>{match.params.walkthroughId}</h3>
//     </div>
//   );
// }

export default FamilyPhotosWalkthrough;