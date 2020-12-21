import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "../../Components/Loader";
import MovieTabs from "../../Components/MovieTabs";
import { Link, Route } from "react-router-dom";
import Video from "../Video";
import ProductionList from "../ProductionList";
import Season from "../Season";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  z-index: 1;
  height: 100%;
`;

const Cover = styled.div`
  width: 30%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 100%;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 10px;
`;

const Title = styled.h3`
  font-size: 32px;
`;

const ItemContainer = styled.div`
  margin: 20px 0;
`;

const Item = styled.span``;

const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 50%;
`;

const IMDBlink = styled.a`
  font-size: 30px;
  margin-top: 10px;
  color: orange;
`
const newTo = (id) => { 
  return "https://www.imdb.com/title/" + id
};

const DetailPresenter = ({ pathname, result, loading, error, isMovie }) =>
  loading ? (
    <Loader />
  ) : (
    <Container>
      <Backdrop
        bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      />
      <Content>
        <Cover
          bgImage={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require("../../noPosterSmall.png")
          }
        />
        <Data>
          <Title>
            {result.original_title
              ? result.original_title
              : result.original_name}
          </Title>
          <IMDBlink>
              <a href={newTo(result.imdb_id)}>Go To IMDB</a>
          </IMDBlink>
          <ItemContainer>
            <Item>
              {result.release_date
                ? result.release_date.substring(0, 4)
                : result.first_air_date.substring(0, 4)}
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.runtime ? result.runtime : result.episode_run_time[0]} min
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.genres &&
                result.genres.map((genre, index) =>
                  index === result.genres.length - 1
                    ? genre.name
                    : `${genre.name} / `
                )}
            </Item>
          </ItemContainer>
          <Overview>{result.overview}</Overview>
          <MovieTabs
            pathname = {pathname}
            isMovie = {isMovie}
            id = {result.id}
            videoUrl = {result.original_title
              ? result.original_title
              : result.original_name}
            productionCom = {result.production_companies}
            productionCont = {result.production_countries}
            seasons = {isMovie ? null:result.seasons}
          />
          <Route path="/movie/:id/video" component={Video} />
          <Route path="/movie/:id/productions" component={ProductionList} />
          <Route path="/show/:id/video" component={Video} />
          <Route path="/show/:id/productions" component={ProductionList} />
          <Route path="/show/:id/seasons" component={Season} />
        </Data>
      </Content>
    </Container>
  );

DetailPresenter.propTypes = {
  result: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string
};

export default DetailPresenter;

/*


api list:
https://developers.themoviedb.org/3/tv/get-tv-details

https://medium.com/@ghur2002/react-router%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%98%EC%97%AC-component%EA%B0%84%EC%97%90-props-%EB%84%98%EA%B2%A8%EC%A3%BC%EA%B8%B0-610de3511c67
*/