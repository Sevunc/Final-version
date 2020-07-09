import React, { Component } from "react";
import fire from "./config/fire";
import firebase from "firebase";
import add from "./images/add.png";
import added from "./images/added.png";

export default class AddPlaylistRenderer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      add: true,
    };
  }

  toggleImage = () => {
    this.setState({ add: false });
  };

  render() {
    let db = firebase.firestore();

    if (this.state.add) {
      return (
        <>
          <div
            onClick={() => {
              fire.auth().onAuthStateChanged((user) =>
                db
                  .collection("users")
                  .add({
                    email: user.email,
                    ArtistName: this.props.data.artist.name,
                    SongName: this.props.data.title_short,
                    Song: this.props.data.preview,
                    Artist: this.props.data.artist.picture_small,
                    Album: this.props.data.album.cover_small,
                    AlbumName: this.props.data.album.title,
                  })

                  .then(function () {
                    console.log("Added");
                  })
                  .catch(function (error) {
                    console.log(error.message);
                  })
              );
            }}
            title="Add to playlist"
          >
            <img
              style={{ cursor: "pointer" }}
              src={add}
              alt="+"
              width="35px"
              height="35px"
              onClick={this.toggleImage}
            />
          </div>
        </>
      );
    }
    return (
      <div title="Added to playlist">
        <img src={added} alt="added" width="35px" height="35px" />
      </div>
    );
  }
}
