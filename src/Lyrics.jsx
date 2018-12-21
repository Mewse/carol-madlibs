import React from 'react';

const Lyrics = (props) => {
    return (
        <div>
            {props.lyrics.map(lyric => <div>{lyric}</div>)}
        </div>
    )
}

export default Lyrics;