import React from 'react';
import YouTube from 'react-youtube';

const VideoPlayer = (props) => {
    const video = props.video;

    if(!video) {
        return <div>Loading Video...</div>;
    }

    const videoId = video.id.videoId;
    const url = `https://www.youtube.com/embed/${videoId}`;
    const opts = {
        height: '390',
        width: '640',
        playerVars: { // https://developers.google.com/youtube/player_parameters
          autoplay: 1
        }
      };

    return (
<<<<<<< HEAD
        <YouTube
            videoId={videoId}
            opts={opts}
            onStateChange={props.onStateChange}
            onReady={props.onReady}
      />
=======
        <div className="video-detail">
            <div className="embed-responsive embed-responsive-16by9">
                <iframe className="embed-responsive-item" src={url}></iframe>
            </div>
        </div>
>>>>>>> session
    );
};

export default VideoPlayer;