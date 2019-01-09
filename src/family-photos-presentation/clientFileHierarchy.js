const clientFileHierarchy = `
$ ls -RF
README.md	package.json	public/		src/		yarn.lock

./public:
favicon.ico	index.html	manifest.json

./src:
App.css			Public.js		photo-feed/
App.js			helpers.js		serviceWorker.js
App.test.js		index.css		session-related/
ErrorText.css		index.js
ErrorText.js		logo.svg

./src/photo-feed:
PhotoFeed.css	PhotoFeed.js

./src/session-related:
AuthButton.js		LoginForm.js
Authentication.js	PrivateRoute.js
`;
export default clientFileHierarchy;