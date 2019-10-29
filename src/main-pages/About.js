// @flow
import React from 'react';
import styled from 'styled-components';
import { Page } from '../styles';
import profilePhoto from '../assets/profile-photo.jpg';

const Text = styled.p`
  color: black;
  padding-right: 30px;
`;

const Image = styled.img`
  float: left;
  max-width: 400px;
  max-height: 400px;
  padding: 50px;
  padding-top: 0px;
`;

const About = () => {
  return (
    <Page>
      <h2>About</h2>
      <Image src={profilePhoto}/>
      <Text>
        Hey, I'm Riyad. I graduated from the University of Illinois at Urbana-Champaign (UIUC)
         with a degree in Math and Computer Science in December 2017. I consider myself a 
         full-stack software engineer, currently most fluent (can whiteboar) in JavaScript.
      </Text>
      <Text>
        Since I took Data Structures in C++, I have a soft spot for C++ and enjoy the time and space
        considerations that the language encourages, particularly when it comes to manually referencing 
        and dereferencing locations in memory, as needed.
      </Text>
      <Text>
        I'm also thankful for the opportunity to have struggled through Algorithms. Before that course,
        I didn't really know how to precisely and methodically solve problems, but now I'm significantly better and able to self-learn
        (take inputs, a desired output, and break down a problem until it's manageable to easily solve).
        I'm still learning and enjoy practicing this muscle of getting better at proble-solving.
      </Text>
      <Text>
        When I'm not working or coding on a personal project, I enjoy the outdoors. My go-to type of exercise is
        cardio, in general. I enjoy jogging / hiking, swimming, and biking. I also enjoy playing tennis and
        very rarely play a good old game of pick-up basketball. I've also been itching to take a day-trip to one
        of the local ski resorts (ie, Big Bear).
      </Text>
      <Text>
        And, of course, I love being around family. Actually, this photo of me was originally a photo of my 
        wife and me biking along the bike path in Santa Monica.
      </Text>
    </Page>
  );
}
export default About;