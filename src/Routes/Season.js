import React from "react";
// import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  font-size: 20px;
  text-align: center;
  display: inline-block;
  margin-right: 5px;
  margin-top: 10px;
  width: 200px;
`;

const Image = styled.div`
  background-image: url(${props => props.bgUrl});
  height: 250px;
  background-size: contain;
  background-repeat: no-repeat;
  border-radius: 4px;
  background-position: center center;
  transition: opacity 0.1s linear;
`;

const Title = styled.span`
  display: block;
  margin-bottom: 3px;
`;

const Content = styled.div`
  font-size: 20px;
  color: white;
  z-index: 1;
`;

const ImageContainer = styled.div`
  margin-bottom: 5px;
  position: relative;
  &:hover {
    ${Image} {
      opacity: 0.3;
    }
  }
`;

const SeasonPoster = ({key, poster_path, name}) => (
  <Container>
    <ImageContainer>
      <Image bgUrl={
        poster_path ? `https://image.tmdb.org/t/p/w300${poster_path}`
        : require("../noPosterSmall.png")
      }
      />
    </ImageContainer>
    <Title>
      {name}
    </Title>
  </Container>
)

export default function Season(props) {
  const seasonList = props.location.state.seasonList;
  return (
    <Content>
      <h1>Another seasons of this program</h1>
      {seasonList.map(season => (
        <SeasonPoster
          key={season.id}
          name= {season.name}
          poster_path = {season.poster_path}
        />
      ))}
    </Content>
  );
}