const serverFileHierarchy = `
$ ls -RF
alter-scripts/		package.json		server.spec.js
build-directory-db.js	photos-root/		users/
helpers/		routes/
package-lock.json	server.js

./alter-scripts:
alter00.sql

./helpers:
basic-auth.js		credentials.js		token-auth.js
constants.js		error-handler.js

./photos-root:
demo/

./photos-root/demo:
IMG_5038.JPG	IMG_5456.JPG	IMG_5617.MOV	IMG_5940.JPG	  IMG_6040.JPG
IMG_5093.JPG	IMG_5459.JPG	IMG_5618.JPG	helloworld.txt	test.JPG

./routes:
login.js	photos.js

./users:
user.service.js
`;
export default serverFileHierarchy;