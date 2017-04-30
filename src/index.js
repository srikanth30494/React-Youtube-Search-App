/**
 * Created by Srikanth on 4/4/2017.
 */
import React, {Component} from 'react';
import _ from 'lodash';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/searchbar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_details';

const API_KEY  = 'AIzaSyBiJp3pj9zRA5CpseHZH9SM8ubIMhEKNh4';


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            videos: [],
            selectedVideo: null
        };
        this.videoSearch('surfboards');
    }

    videoSearch(term){
        YTSearch({key: API_KEY, term: term}, (videos) => {
            this.setState({
                videos: videos,
                selectedVideo : videos[0]
            });
        });
    }

    render() {
        const videoSearch = _.debounce((term)=>{this.videoSearch(term)},300);

        return (
            <div>
                <SearchBar onSearchTermChange={videoSearch} />
                <VideoDetail video={this.state.selectedVideo}/>
                <VideoList
                    onVideoSelect = {selectedVideo => this.setState({selectedVideo})}
                    videos={this.state.videos} />
            </div>
        );
    }
}

ReactDOM.render(<App />, window.document.querySelector('.container'));
