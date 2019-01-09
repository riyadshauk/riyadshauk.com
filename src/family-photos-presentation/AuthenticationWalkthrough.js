// @flow
import React from 'react';

import CodeSnippet from '../CodeSnippet';

import serverFileHierarchy from './serverFileHierarchy';
import serverPackageJSONSnippet from './serverPackageJSONSnippet';
import testOutput from './testOutput';
import clientPackageJSON from './clientPackageJSON';
import clientFileHierarchy from './clientFileHierarchy';
import clientApp from './clientApp';
import privateRoute from './privateRoute';

const AuthenticationWalkthrough = () => {
  return (
    <div>
      <h2>Authentication Walkthrough</h2>
      <p>
        Here, I will show what went into authenticating this app.
      </p>
      <h3>
        Step 1: Build a secured REST API (Express)
      </h3>
      <h3>Relevant pieces of the server's package.json</h3>
      {
        CodeSnippet(serverPackageJSONSnippet, 'javascript')
      }
      <h3>Along with the General Server-side Structure (Express)</h3>
      {
        CodeSnippet(serverFileHierarchy, 'bash')
      }
      The REST API currently supports two routes.
      { CodeSnippet(`
app.use('/login', loginRouter);
app.use('/photos', photosRouter);
`
      ) }
      <p>
        The first route is straightforward: We call the `/login` route with a valid 
        Basic Authorization header in order to generate a valid Bearer Token; this uses
        the `loginRouter` middleware which in turn uses a custom `basic-auth` Express middleware.
      </p>
      <p>
        The second route, `/photos` uses `photosRouter` which is protected using a custom token-auth Express middleware.
      </p>
      {/* explanation of `/login` route */}
      <h4>Explanation of `/login` route</h4>
      <p>
        There isn't anything special about `loginRouter` other than its use of `basicAuth` which uses a library called
        `jsonwebtoken` to generate a JWT containing an `expirationDate` property and using a secret key, provided the user is authorized. To check if the user is authorized
        in `basicAuth`, a call to the database is made using `userService` which uses a third-party library for connecting to
        a Postgres database, `pg`. Finally, either the token is sent directly to the client (no need to save it on the back-end)
        with a 200 OK response status code, or the client will receive a 401 Unauthorized status code.
      </p>
      <p>
        To sum up the previous paragraph:
      </p>
      <p>
        <strong>Client</strong> (POST /login) --> <strong>Server</strong> (parse out user &amp; password from request) --> <strong>Database</strong> (verify credentials) --> <strong>Server</strong> (generate JWT with `jsonwebtoken` OR send error) --> <strong>Client</strong> (now authorized OR told he doesn't have access).
      </p>

      <h4>On to the authentication for the `/photos` route</h4>
      <p>
        The `photos` route simply uses `token-auth` as middleware to ensure every request coming in to the `photos`
         route is authorized to consume this API. All tokenAuth does is verify whether the provided token is valid 
         by using the `jsonwebtoken` library to decrypt the provided token against the API's secret key. If the decryption 
         is successful, the resulting JWT with the `expirationDate` property will be tested against the current date/time,
         then, if the token is deemed valid, Express' `next()` is called and the request can continue past this `tokenAuth` middleware.
         However, if the token is invalid, a 401 Unauthorized status code is sent to the client at this point.
      </p>
      <p>
        In terms of consuming the endpoint at this route, a token may be provided via a standard `Authorization Bearer [token value here]` header, or by passing it as a
        URL-encoded query parameter (ie, `hostname/photos/album/aPhoto.JPG?token=[token value here]`).
      </p>
      <p>
        To sum up how bearer token-based authentication works in this API (ie, with the '/photos' route):
      </p>
      <p>
        <strong>Client</strong> (GET /photos) --> <strong>Server</strong> (tokenAuth middleware parse and verify token) --> <strong>Server</strong> (if authorized, reads and sends photo from filesystem) --> <strong>Client</strong> (recieves photo with 200 OK OR gets 401 Unauthorized or 403 Forbidden or 404 Not Found status)
      </p>
      <h3>
        Testing Authentication on the API (BDD)
      </h3>
      <p>
        I'll just show a snippet of test-result output from mocha / chai. 
        I wrote these test cases because I found myself manually sanity-testing different routes 
        (in Postman or from the browser client) when making changes, 
        so these serve more as regressional tests.
      </p>
      {
        CodeSnippet(testOutput, 'bash')
      }

      <h3>
        Step 2: Build a React Client
      </h3>
      <h3>The client's entire package.json</h3>
      {
        CodeSnippet(clientPackageJSON, 'javascript')
      }
      <p>
        Yeah, as you may have noticed above, I went ahead an generated the app with the CRA scaffold. I figured may as well get up and running fast,
        then refactor to explicitly build my app as needed, when/if I actually need to touch webpack or decide on using
        gulp, etc.
      </p>
      <h3>Along with the client's file structure</h3>
      {
        CodeSnippet(clientFileHierarchy, 'bash')
      }
      <h3>Front-end Authentication</h3>
      <p>
        I simply used React Router to handle front-end authentication. Most of what I got was directly from this page
        (<a href="https://reacttraining.com/react-router/web/example/auth-workflow">https://reacttraining.com/react-router/web/example/auth-workflow</a>).
      </p>

      <p>
        I'll just briefly explain the meat of my client-side authentication code, at a high-level (eg, at the `App.js` / root-level – and yeah, I decided to name my JSX components with a `.js` file extension since that is what reactjs.org currently promotes, along with CRA; this is a debated opinion, but I enjoy the 'ergonomics' of this approach, as Dan Abramov puts it).
      </p>
      {
        CodeSnippet(clientApp, 'react')
      }
      <p>
        And to properly understand the above, we should understand how `PrivateRoute` works, so here's that (I guess my syntax highlighter doesn't like JS that's too modern...):
      </p>
      {
        CodeSnippet(privateRoute, 'typescript')
      }
      <p>
        From this snippet, we see that we only render the protected route (which is the PhotoFeed component), once 
        the Authentication.isAuthenticated flag is set to true (which is only set after a successful POST request to `/login`).
        Since this is client-side authentication logic, it's susceptible to being overridden by a script-kiddy, but it
        doesn't matter much, because....
      </p>
      <p>
        Actually, the contents of PhotoFeed all live on the server, and a valid token is required to get them, anyways.
        It turns out that whenever a user logs out, Authentication.isAuthenticated is set to false.
        I may need to test out React lifecycle methods and React Router a bit before I can conclude any further regarding 
        potential security risks of this front-end authentication.
      </p>
      <p>
        A part I didn't show here is my usage of the third-party library, `axios`, to very concisely make client-side POST
        and GET requests by supplying the correct `Authorization [Bearer/Basic] [bearer token / basic username:password]` credentials.
        That is fairly simple and I feel I've already shown quite a bit of code on this page.
      </p>
      <p>
        You're now ready to jump into the codebase to understand more, or see the various `@todo` directives that still need work
        – feel free to use it with your family and start contributing (once I open-source it)!
      </p>


      <h3>
        Portions of this Full-Stack app are still currently very much in progress
      </h3>
      <li>
        Database Design
      </li>
      <li>
        Photo Processing
      </li>
      <li>
        Photo Rendering
      </li>
      <li>
        Simple next features: display EXIF, likes, comments, front-end authentication security testing
      </li>
      <li>
        More involved features: video streaming + thumbnails, modifying build system to optimize photos when sending to client (PJPG, eg) – taking considerations from images.guide
      </li>
      <strong>
        Feel free to ask me a question about this app or dive into the codebase!
      </strong>
    </div>
  );
}
export default AuthenticationWalkthrough;