import React from "react";
import DetailPresenter from "./DetailPresenter";
import { moviesApi, tvApi } from "../../api";

export default class extends React.Component {

  constructor(props) {
    super(props);
    const {
      location: { pathname }
    } = props;
    this.state = {
      result: null,
      error: null,
      loading: true,
      isMovie: pathname.includes("/movie/")
      // url안에 movie가 있는지없는지
    };
  }

  async componentDidMount(){
    // 1. props를 가져와야함
    const {match: {
      params: {id}
    },
    history: {push} //this.props 항목에 location이 있음
  } = this.props;
  const parsedId = parseInt(id);
  if(isNaN(parsedId)) {
    return push("/") 
  }
  const { isMovie } = this.state;
  let result = null;
    try { // result를 덮어쓰기 함
      if (isMovie) { // url이 무비라면 movie 데이터를 가져오고
        ({ data: result } = await moviesApi.movieDetail(parsedId));
      } else { // TV로부터 요청된 데이터를 가져옴
        ({ data: result } = await tvApi.showDetail(parsedId));
      }
    } catch {
      this.setState({ error: "Can't find anything." });
    } finally {
      this.setState({ loading: false, result });
      // result는 null일수도 아닐수도 있음
  }
}

  render() {
    const pathname = this.props.location;
    const { result, error, loading, isMovie } = this.state;
    return <DetailPresenter pathname={pathname} result={result} error={error} loading={loading} isMovie={isMovie} />;
  }
}