// @flow
import React, { Fragment } from 'react';
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

import { UnorderedList as Navigation, Link as Item } from './styles';

const Footer = styled.footer`
  padding-top: 50px;
  padding-left: 10px;
  position: bottom;
`;

const App = () => (
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
        Copyright © 2020, Riyad Shauk
          </div>
    </Footer>
  </Fragment>
);

export default App;
