import React from "react";
import { graphql } from "react-apollo";
import { getSongsQuery } from "../../queries/queries";

const SongList = props => {
  console.log(props); //check in the browser to see this values.

  const displaySongs = () => {
    var data = props.data;
    if (data.loading) {
      return <div>Loading Songs...</div>;
    } else {
      return data.songs.map(song => {
        return <li key={song.id}>{song.title}</li>;
      })
    }
  }

  return (
    <>
      <ul id="songList">
        {displaySongs()}
      </ul>
    </>
  );
};

export default  graphql(getSongsQuery) (SongList);
