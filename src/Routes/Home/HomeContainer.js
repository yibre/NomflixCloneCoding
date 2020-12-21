import React from "react";
import HomePresenter from "./HomePresenter";
import { moviesApi } from "../../api";

// 첫 번째 컨테이너 컴포넌트들

export default class extends React.Component {
  state = {
    // api에 필요한 상태조건들 3가지
    nowPlaying: null,
    upcoming: null,
    popular: null,
    error: null, // 에러가 발생할 수도 있음.
    loading: true // 로딩 디폴트는 항상 true
  };

  async componentDidMount() {
    try {
      const {
        data: { results: nowPlaying }
      } = await moviesApi.nowPlaying();
      const {
        data: { results: upcoming }
      } = await moviesApi.upcoming();
      const {
        data: { results: popular }
      } = await moviesApi.popular();
      this.setState({
        nowPlaying,
        upcoming,
        popular
      });
    } catch {
      this.setState({
        error: "Can't find movies information."
      });
    } finally {
      this.setState({
        loading: false
      });
    }
  }
  render() { // homepresenter로 가는 모든 벨류들을 보내줄 것.
    const { nowPlaying, upcoming, popular, error, loading } = this.state;
    return (
      <HomePresenter
        nowPlaying={nowPlaying}
        upcoming={upcoming}
        popular={popular}
        error={error}
        loading={loading}
      />
    );
  }
}