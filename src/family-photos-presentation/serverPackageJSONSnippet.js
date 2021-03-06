const serverPackageJSONSnippet = `
{
  "description": "A photo webserver to host from your home server (think Google / Facebook photos replacement) -- no vendor lock-in.",
  "main": "server.js",
  "scripts": {
    "test": "npm start ; mocha server.spec.js",
    "start": "node server.js"
  },
  "dependencies": {
    "body-parser": "^1.18.3",
    "connect-flash": "^0.1.1",
    "cors": "^2.8.5",
    "express": "^4.16.4",
    "jsonwebtoken": "^8.4.0",
    "pg": "^7.7.1"
  },
  "devDependencies": {
    "@types/axios": "^0.14.0",
    "@types/chai": "^4.1.7",
    "@types/mocha": "^5.2.5",
    "@types/pg": "^7.4.11",
    "axios": "^0.18.0",
    "chai": "^4.2.0",
    "mocha": "^5.2.0"
  }
}
`;
export default serverPackageJSONSnippet;