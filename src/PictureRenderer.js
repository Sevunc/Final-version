import React from "react";
export default function PictureRenderer(props) {
  return (
    <a href={props.data.link} target="blank" title="Full song is in deezer.com">
      {" "}
      <img src={props.data.artist.picture_small} alt="Artist" />
    </a>
  );
}
