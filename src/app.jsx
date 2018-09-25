import React from 'react';
import Search from './components/Search';
import VideoList from './components/VideoList';
import Video from './components/Video';
import YTSearch from 'youtube-api-search';

const API_KEY = 'AIzaSyBgPV0sEkPdDFo74edaN8xug0z1NK4-PNU';


export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null
    };

  }

  videoSearch(searchTerm) {
    YTSearch({key: API_KEY, term: searchTerm}, (data) => {
      this.setState({
        videos: data,
        selectedVideo: data[0]
      });
    });
  }


  render() {
    return (
      <div className="app">
        <div className="w-75 outerVideoContainer">
          <Video video={this.state.selectedVideo}/>
        </div>
        <VideoList 
          onVideoSelect={userSelected => this.setState({selectedVideo: userSelected})}
          videos={this.state.videos} /> 
        <Search onSearchTermChange={searchTerm => this.videoSearch(searchTerm)}/>
      </div>

    );
  }
}
