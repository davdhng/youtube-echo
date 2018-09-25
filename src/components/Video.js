import React from 'react';

const Video = (props) => {
    const video = props.video;


    if (!video) {
        return <div></div>
    }

    const videoId = video.id.videoId;
    
    const opts = {
        playerVars: {
            disablekb: 1,
            fs: 0,
            modestbranding: 1,
            playsInline: 1,
            rel: 0,
            controls: 0,
            loop: 1,
            playlist: videoId
        }
    }
    const url = `https://www.youtube.com/embed/${videoId}?enablejsapi=1`;

    return (
        <div className="container videoContainer">
            <div className="video embed-responsive embed-responsive-16by9">
                <iframe className="embed-responsive-item" src={url}></iframe>
            </div>
        </div>
    )
}

export default Video;