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
    </Page>
  );
}
export default Home;
