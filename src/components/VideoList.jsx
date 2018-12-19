import React from 'react';
import VideoListItem from './VideoListItem.jsx';

const VideoList = (props) => {
    const videoItems = props.videos.map((video) => {
        return (
            <VideoListItem
                onUserSelected={props.onVideoSelect}
                key={video.etag}
                video={video} />
        );
    });

    return (
                    <ul className="list-group">
                    {videoItems}
                    </ul>
    );
};

export default VideoList;