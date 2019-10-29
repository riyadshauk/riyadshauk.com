// @flow
import React, { Component, Fragment } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import styled from 'styled-components';

import Home from './main-pages/Home';
import About from './main-pages/About';
import Projects from './main-pages/Projects';
import Resume from './main-pages/Resume';
import nginxLogo from './assets/nginx-logo.svg';
import letsencryptLogo from './assets/letsencrypt-logo-horizontal.svg';
import countlyLogo from './assets/countly-logo.svg';

import { UnorderedList as Navigation, Link as Item } from './styles';

type Props = {};
type State = {};

const CountlyBadge = styled.img`
  width: 145px;
  height: 60px;
`;

const Footer = styled.footer`
  padding-top: 50px;
  padding-left: 10px;
  position: bottom;
`;

const FooterBadges = styled.div`
  img {
    padding-right: 10px;
  }
`;

class App extends Component<Props, State> {
  render() {
    return (
      <Fragment>

        <Router>
          <div>
            <Navigation className="navigation">
              <Item>
                <Link to="/">Home</Link>
              </Item>
              <Item>
                <Link to="/about">About</Link>
              </Item>
              <Item>
                <Link to="/projects">Projects</Link>
              </Item>
              <Item>
                <Link to="/resume">Resume</Link>
              </Item>
            </Navigation>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/resume" component={Resume} />
            <Route path="/projects" component={Projects} />
          </div>
        </Router>
        <Footer>
          <div>
            Updated by Riyad Shauk on Mon Oct 28 2019 22:39:56 GMT-0700 (Pacific Daylight Time).
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
          <FooterBadges>
            <a href="https://docs.nginx.com">
              <img src={nginxLogo} alt="Web Server Load Balancing with NGINX Plus"></img>
            </a>
            <a href="https://letsencrypt.org">
              <img src={letsencryptLogo} alt="Let's Encrypt"></img>
            </a>
            <a href="https://count.ly/" rel="nofollow">
              <CountlyBadge src={countlyLogo} alt="Countly - Product Analytics" />
            </a>
          </FooterBadges>
          <div>
            Copyright © 2019, Riyad Shauk
          </div>
        </Footer>
      </Fragment>
    );
  }
}

export default App;
