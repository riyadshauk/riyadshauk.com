// @flow
import React from 'react';
import './Home.css';
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
      <div className="photoContainer">
        <img src="./our_tandem.jpg" className="photo" alt="Road Tandem" />
        <p>My wife, Ayesha, and I after taking the train down to Long Beach before riding back up to Santa Monica on our (then-new) tandem bike.</p>
      </div>
      <div className="photoContainer">
        <img src="./skull_rock_climb_hike.jpg" className="photo" alt="Hiking" />
        <p>Me trying to get out of a tough position on Skull Rock in the Pacific Palisades after hiking up there. (Photo creds: Ayesha)</p>
      </div>
      <footer>
        <div>
          Updated by Riyad Shauk on Tue Jan 15 2019 21:50:38 GMT-0800 (Pacific Standard Time)
        </div>
        <div>
          Server powered by <a href="https://docs.nginx.com/">nginx</a>.
        </div>
        <div>
          TLS / HTTPS security: courtesy of <a href="https://www.eff.org/">Electronic Frontier Foundation</a> and their brilliant child, <a href="https://letsencrypt.org">Let's Encrypt</a>.
        </div>
        <div>
          Self-hosted, FOSS Analytics powered by <a href="https://github.com/Countly/countly-server">Countly</a>.
        </div>
        <a href="https://docs.nginx.com">
          <img src="nginx-logo.svg" alt="Web Server Load Balancing with NGINX Plus"></img>
        </a>
        <a href="https://letsencrypt.org">
          <img src="letsencrypt-logo-horizontal.svg" alt="Let's Encrypt"></img>
        </a>
        <a href="https://count.ly/" rel="nofollow">
          <img className="countlyBadge" src="countly-logo.svg" alt="Countly - Product Analytics" />
        </a>
        <div>
          Copyright © 2019, Riyad Shauk
        </div>
      </footer>
    </div>
  );
}
export default Home;
