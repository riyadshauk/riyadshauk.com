const testOutput = `
$ npm test

> photoserver@1.0.0 test {file path omitted here}
> npm start ; mocha server.spec.js


> photoserver@1.0.0 start {file path omitted here}
> node server.js

events.js:173
      throw er; // Unhandled 'error' event
      ^

Error: listen EADDRINUSE: address already in use :::8080
{details of the above unimportant error omitted}


  Simple webserver black-box tests
    Logging in
      ✓ should send 401 Unauthorized status code when authorization header is missing (65ms)
      ✓ should send 401 Unauthorized status code when invalid username-password pair correctly provided
      ✓ should send 200 OK status code when valid username-password pair correctly provided
    Protected Routes & Bearer Token Authentication (via 'sample-photos' static folder)
      Protecting 'photos' route
        ✓ should send 401 Unauthorized status code when no authorization header provided
        ✓ should send 401 Unauthorized status code when empty token provided
        ✓ should send 401 Unauthorized status code when invalid token provided
        ✓ should send 403 Forbidden status code when valid token provided for non-jpg file
        ✓ should send 404 Not Found status code when valid token provided for non-existant jpg file
        ✓ should send 200 OK status code when valid token provided (in request header) for jpg file (65ms)
        ✓ should send 200 OK status code when valid token provided (in query parameter named "token") for jpg file (63ms)


  10 passing (275ms)
`;
export default testOutput;