import React from 'react';

const VideoListItem = (props) => {
    const video = props.video;
    const onUserSelected = props.onUserSelected;

    return (
    <li onClick={() => onUserSelected(video)} className="">
            <p className="videoTitle">{video.snippet.title}</p>
    </li>
    );
};

export default VideoListItem;