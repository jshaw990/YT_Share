import React from 'react';
import YouTube from 'react-youtube';

const VideoPlayer = (props) => {
    const video = props.video;

    if (!video) {
        return <div>Loading Video...</div>;
    }
    if (props.member === props.room) {
        const videoId = video.id.videoId;
        const url = `https://www.youtube.com/embed/${videoId}`;

        const opts = {
            height: '390',
            width: '640',
            playerVars: { // https://developers.google.com/youtube/player_parameters
                autoplay: 1,
                controls: 1
            }
        };
        return (
            <YouTube
                videoId={videoId}
                opts={opts}
                onStateChange={props.onStateChange}
                onReady={props.onReady}
            />
        );
    }
    else {
        const videoId = video.id.videoId;
        const url = `https://www.youtube.com/embed/${videoId}`;

        const opts = {
            height: '390',
            width: '640',
            playerVars: { // https://developers.google.com/youtube/player_parameters
                autoplay: 1,
                controls: 0,
                disablekb: 1
            }
        };
        return (
            <YouTube
                videoId={videoId}
                opts={opts}
                onStateChange={props.onStateChange}
                onReady={props.onReady}
            />
        );
    }
};
export default VideoPlayer;