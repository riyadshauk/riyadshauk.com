// @flow
import React, { Component } from 'react';
import styles from './Home.css';
const Home = () => {
  return (
    <div>
      <h2>Home</h2>
      <p>
        Welcome to my homepage. I'm currently working on the nginx configuration 
        (I'm thus sorry if there are any broken links at the moment).
      </p>
      <p>
        I like to work on my personal projects (which I then tie into this webpage) when I get home from work in the evenings.
      </p>
      <p>
        You can often find my latest project work on <a href="https://github.com/riyadshauk">my personal GitHub page</a>.
      </p>
      <p>
        Thanks for visiting!
      </p>
      <img src="./our_tandem.jpg" className={styles.photo} />
      <p>My wife, Ayesha, and I after taking the train down to Long Beach before riding back up to Santa Monica on our (then-new) tandem bike.</p>
      <img src="./skull_rock_climb_hike.jpg" className={styles.photo} />
      <p>Me trying to get out of a tough position on Skull Rock in the Pacific Palisades after hiking up there. (Photo creds: Ayesha)</p>
      <footer>
        Updated by Riyad Shauk on Thu Jan 10 2019 10:24:44 GMT-0800 (Pacific Standard Time)
      </footer>
    </div>
  );
}
export default Home;