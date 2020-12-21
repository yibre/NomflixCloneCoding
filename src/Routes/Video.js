import React, { useState, useEffect } from "react";
import axios from "axios";
// import PropTypes from "prop-types";
import styled from "styled-components";

const VideoContent = styled.div`
  width: 100%;
  height: 100%;
`;

const Player = styled.iframe`
  width: 80%;
  height: 60%;
`;

const youtubeApi = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
    part: "snippet",
    maxResults: 5,
    key: "AIzaSyB0R7DQ1VY6zx1XUDXuWa-wcQVwlYQHOqU"
  },
  headers: {}
});

const Videoplayer = ({ videoId }) => {
  if (!videoId) {
    return (
      <p style={{ textAlign: "center", fontSize: "18px", fontWeight: "bold" }}>
        No Video Results
      </p>
    );
  }
  return (
    <VideoContent>
      <Player
        title={videoId}
        className="video-iframe"
        src={`https://www.youtube.com/embed/${videoId}`}
      />
    </VideoContent>
  );
};

export default function Video(props) {
  const keyword = props.location.state.keyword;

  const [youtubes, setYoutubes] = useState([]);
  const [youtubeId, setYoutubeId] = useState(null);
  const onSearch = async keyword => {
    const response = await youtubeApi.get("/search", {
      params: {
        q: keyword
      }
    });
    setYoutubes(response.data.items);
    setYoutubeId(response.data.items[0].id.videoId);
  };
  useEffect(()=> {
    onSearch(keyword+" trailer");
    console.log(youtubeId);
  }, []);
  return <Videoplayer videoId={youtubeId}/>;
}

/*
 https://ssungkang.tistory.com/entry/React-react%EC%9D%98-%EB%84%A4%EB%B9%84%EA%B2%8C%EC%9D%B4%EC%85%98-react-router-dom

 

api key
AIzaSyB0R7DQ1VY6zx1XUDXuWa-wcQVwlYQHOqU

https://www.youtube.com/watch?v=iDzR6twXE_E

해당 코드에 참고한 자료:

1. 유튜브 api 사용하는 방법
https://www.youtube.com/watch?v=44-Kx5ZZTsY
https://codingshiksha.com/react/react-js-youtube-data-api-v3-video-search-example-using-axios-full-tutorial-for-beginners-2020/
*/