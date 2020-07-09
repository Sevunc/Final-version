import React, { Component } from "react";
import fire from "./config/fire";
import firebase from "firebase";
import { ToastContainer, toast } from "react-toastify";
import ReactAudioPlayer from "react-audio-player";
import "./Home.css";
import { MDBIcon, MDBNavbar, MDBBtn } from "mdbreact";
import { Link } from "react-router-dom";
import remove from "./images/remove.png";

export default class Playlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: [],
    };
  }

  componentDidMount() {
    let arr = [];
    let db = firebase.firestore();
    fire.auth().onAuthStateChanged((user) =>
      db
        .collection("users")
        .get()
        .then((snap) => {
          snap.forEach((doc) => {
            if (user) {
              if (doc.data().email === user.email) {
                arr.push(doc.data());
                this.setState({ listData: arr });
                console.log(this.state.listData);
              }
            }
          });
        })
    );
  }
  render() {
    let db = firebase.firestore();

    return (
      <>
        <MDBNavbar color="purple-gradient">
          <div>
            <Link to="/">
              <MDBBtn>Back to LoginPage</MDBBtn>{" "}
            </Link>
          </div>
          <div>
            <Link to="/Home">
              <MDBIcon style={{ color: "black" }} icon="user" />{" "}
            </Link>
          </div>
        </MDBNavbar>
        <div>
          <table
            style={{
              backgroundColor: "grey",
              border: "1px solid #dddddd",
              textAlign: "center",
              width: "65%",
              color: "white",
            }}
          >
            <thead>
              <tr style={{ border: "1px solid #dddddd" }}>
                <th style={{ fontSize: "18px" }}>Artist</th>
                <th style={{ fontSize: "18px" }}>Artist Name</th>
                <th style={{ fontSize: "18px" }}>Album</th>
                <th style={{ fontSize: "18px" }}>Song Name</th>
                <th style={{ fontSize: "18px" }}>Song</th>
                <th style={{ fontSize: "18px" }}>Remove</th>
              </tr>
            </thead>
            <tbody>
              {this.state.listData.map((stat, index) => (
                <tr
                  style={{ border: "1px solid #dddddd" }}
                  key={index.toString()}
                >
                  <td>
                    <img src={stat.Artist} alt="Artist" />
                  </td>
                  <td style={{ fontSize: "16px" }}>{stat.ArtistName}</td>
                  <td title={stat.AlbumName}>
                    <img src={stat.Album} alt="Album" />
                  </td>
                  <td style={{ fontSize: "16px" }}>{stat.SongName}</td>
                  <td style={{ fontSize: "16px" }}>
                    {<ReactAudioPlayer src={stat.Song} controls />}
                  </td>
                  <td style={{ fontSize: "16px" }}>
                    <div
                      onClick={() => {
                        db.collection("users")
                          .get()
                          .then((snap) => {
                            snap.forEach((doc) => {
                              if (doc.data().Song === stat.Song) {
                                const id = doc.id;
                                db.collection("users")
                                  .doc(id)
                                  .delete()
                                  .then(function () {
                                    toast.success("Removed from playlist!", {
                                      position: "top-center",
                                      autoClose: false,
                                    });
                                    console.log(
                                      "Document successfully deleted!"
                                    );
                                  })
                                  .catch(function (error) {
                                    toast.error("Error removing document: ", {
                                      position: toast.POSITION.TOP_RIGHT,
                                    });
                                    console.error(
                                      "Error removing document: ",
                                      error
                                    );
                                  });
                              }
                            });
                          });
                        setTimeout(
                          window.location.reload.bind(window.location),
                          2000
                        );
                      }}
                      title="Remove from playlist"
                    >
                      <img
                        style={{ cursor: "pointer" }}
                        src={remove}
                        alt="Remov"
                        width="35px"
                        height="35px"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <ToastContainer />
        </div>
      </>
    );
  }
}
