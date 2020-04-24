// @flow
import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Page } from '../styles';
import ourTandem from '../assets/our_tandem.jpg';
import skullRockClimb from '../assets/skull_rock_climb_hike.jpg';

const SliderContainer = styled.div`
  width: 400px;
`;

const Image = styled.img`
  width: 400px;
  height: auto;
`;

const Home = () => {
  const sliderConfig = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <Page>
      <h2>Home</h2>
      <center>
        <svg height="135" width="1000">
          <text x="0" y="15">
              Welcome to my webpage!
          </text>
          <text x="0" y="45">
              I like to work on personal projects (which I then tie into this webpage) 
          </text>
          <text x="5" y="75">
              when I get home from work in the evenings.
          </text>
          <text x="0" y="105">
              You can often find my latest project work on
          </text>
          <text x="325" y="105" fill="blue"><a href="https://github.com/riyadshauk">my personal GitHub page</a>.</text>
        </svg>
        <svg height="100" width="200">
          <text x="0" y="15" fill="lightblue" transform="rotate(30 20,40)">Thanks for visiting!</text>
        </svg>
        <SliderContainer>
          <Slider {...sliderConfig}>
            <div className="photoContainer">
              <Image src={ourTandem} className="photo" alt="Road Tandem" />
              <p>My wife, Ayesha, and I after taking the train down to Long Beach before riding back up to Santa Monica on our (then-new) tandem bike.</p>
            </div>
            <div className="photoContainer">
              <Image src={skullRockClimb} className="photo" alt="Hiking" />
              <p>Me trying to get out of a tough position on Skull Rock in the Pacific Palisades after hiking up there. (Photo creds: Ayesha)</p>
            </div>
          </Slider>
        </SliderContainer>
      </center>
    </Page>
  );
}
export default Home;
