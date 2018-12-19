import React from 'react';

const VideoPlayer = (props) => {
    const video = props.video;

    if(!video) {
        return <div>Loading Video...</div>;
    }

    const videoId = video.id.videoId;
    const url = `https://www.youtube.com/embed/${videoId}`;

    return (
        <div className="video-detail">
            <div className="embed-responsive embed-responsive-16by9">
                <iframe className="embed-responsive-item" src={url}></iframe>
            </div>
        </div>
    );
};

export default VideoPlayer;