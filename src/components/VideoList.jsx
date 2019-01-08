import React from 'react';
import VideoListItem from './VideoListItem.jsx';

const VideoList = (props) => {
    const videoItems = props.videos.map((video) => {
    const isAdmin = props.member === props.room;
        return (
            isAdmin ? 
            <VideoListItem
                onUserSelected={props.onVideoSelect}
                key={video.etag}
                video={video} />
                : null
        );
    });
    return (
        <ul className="list-group">
        {videoItems}
        </ul>
    );
};

export default VideoList;