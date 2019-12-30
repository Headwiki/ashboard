import React from "react"
import "./index.css"
import SongList from "../Songs/SongList";
import AddSong from "../Songs/AddSong";

function Main() {
    return (
        <div className='Main'>
            <SongList />
            {/* <AddSong /> */}
        </div>
    )
}

export default Main