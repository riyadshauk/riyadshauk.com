// @flow
import React, { Component } from 'react';
import styles from './Home.css';
const Home = () => {
  return (
    <div>
      <h2>Home</h2>
      <p>
        Welcome to my webpage!
      </p>
      <p>
        I like to work on personal projects (which I then tie into this webpage) when I get home from work in the evenings.
      </p>
      <p>
        You can often find my latest project work on <a href="https://github.com/riyadshauk">my personal GitHub page</a>.
      </p>
      <p>
        Thanks for visiting!
      </p>
      <p>
        <strong>Disclaimer</strong>: Sorry, in advance, if some static files are broken; I'm currently learning
         how to use <a href="https://docs.nginx.com/">nginx</a> for the first time and things don't always work correctly.
          I plan on adding front-end browser testing down the road, for this reason.
      </p>
      <div className={styles.photoContainer}>
      	<img src="./our_tandem.jpg" className={styles.photo} />
      	<p>My wife, Ayesha, and I after taking the train down to Long Beach before riding back up to Santa Monica on our (then-new) tandem bike.</p>
      </div>
      <div className={styles.photoContainer}>
      	<img src="./skull_rock_climb_hike.jpg" className={styles.photo} />
      	<p>Me trying to get out of a tough position on Skull Rock in the Pacific Palisades after hiking up there. (Photo creds: Ayesha)</p>
      </div>
      <footer>
        Updated by Riyad Shauk on Sun Jan 13 2019 18:28:49 GMT-0800 (Pacific Standard Time)
      </footer>
    </div>
  );
}
export default Home;
