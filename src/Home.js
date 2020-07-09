import React, { Component } from "react";
import CarouselPage from "./Slider";
import fire from "./config/fire";
import axios from "axios";
import Cards from "./Cards";
import CardCovid from "./CardCovid";
import "./Home.css";
import PictureRenderer from "./PictureRenderer";
import SongRenderer from "./SongRenderer";
import AddPlaylistRenderer from "./AddPlaylistRenderer";
import Loader from "./Loader.gif";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { Link } from "react-router-dom";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { toast, ToastContainer } from "react-toastify";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavbarToggler,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBIcon,
  MDBBtn,
} from "mdbreact";
class Home extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.state = {
      modules: [ClientSideRowModelModule],
      isOpen: false,
      columnDefs: [
        {
          headerName: "Artist",
          field: "artist.picture_small",
          cellRenderer: "picture",
          width: "80",
        },
        {
          headerName: "Artist name",
          field: "artist.name",
          width: "120",
          headerClass: "name",
        },
        {
          headerName: "Song name",
          field: "title_short",
          width: "120",
        },
        {
          headerName: "Song",
          field: "preview",
          cellRenderer: "song",
          width: "330",
          headerClass: "name",
        },
        {
          headerName: "Add",
          field: "",
          cellRenderer: "playlist",
          cellRendererParams: {},
          width: "70",
        },
      ],
      defaultColDef: {
        resizable: true,
      },
      rowData: [],
      rowData2: [],
      getRowHeight: function () {
        return 57;
      },
      frameworkComponents: {
        picture: PictureRenderer,
        song: SongRenderer,
        playlist: AddPlaylistRenderer,
      },
      query: "",
      loading: false,
    };
    this.cancel = "";
  }

  logout() {
    fire.auth().signOut();
  }
  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  searchResults = (indexNumber = "", query) => {
    const indexNum = indexNumber ? `&index=25${indexNumber}` : "";
    const url = `/search?redirect_uri=http%253A%252F%252Fguardian.mashape.com%252Fcallback&q=${query}${indexNum}`;
    if (this.cancel) {
      this.cancel.cancel();
    }
    this.cancel = axios.CancelToken.source();
    axios
      .get(url, {
        cancelToken: this.cancel.token,
      })
      .then((res) => {
        if (!res.data.data.length) {
          toast.info("No more search results, please try a new search", {
            position: "top-center",
            autoClose: false,
          });
        }
        console.log(res.data.data);
        this.setState({
          rowData: res.data.data,
          loading: false,
        });
      })
      .catch((error) => {
        if (axios.isCancel(error) || error) {
          this.setState({
            loading: false,
          });
          console.log(error.message);
        }
      });
  };
  renderSearchResults = () => {
    const { rowData } = this.state;
    if (Object.keys(rowData).length && rowData.length) {
      return (
        <div
          className="ag-theme-alpine"
          style={{
            width: "54%",
            height: "575px",
          }}
        >
          <AgGridReact
            modules={this.state.modules}
            columnDefs={this.state.columnDefs}
            defaultColDef={this.state.defaultColDef}
            rowData={this.state.rowData}
            frameworkComponents={this.state.frameworkComponents}
            getRowHeight={this.state.getRowHeight}
            // rowClassRules={this.state.rowClassRules}
          ></AgGridReact>
        </div>
      );
    }
  };

  onInputChange = (event) => {
    const query = event.target.value;
    if (!query) {
      this.setState({ query: query, results: {} });
    } else {
      this.setState({ query: query, loading: true }, () => {
        this.searchResults(1, query);
      });
    }
  };
  render() {
    const query = this.state.query;
    const loading = this.state.loading;
    return (
      <>
        <div>
          <MDBNavbar color="purple-gradient" dark expand="md">
            <MDBNavbarToggler onClick={this.toggleCollapse} />
            <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
              <MDBNavbarNav left>
                <MDBNavItem active>
                  <Link to="/">
                    <MDBBtn>Back to LoginPage</MDBBtn>
                  </Link>
                </MDBNavItem>
                {
                  <MDBNavItem>
                    <MDBDropdown>
                      <MDBDropdownToggle nav caret>
                        <div className="d-none d-md-inline">
                          <MDBBtn style={{ marginTop: "-1px" }}>
                            Search/Playlist
                          </MDBBtn>
                        </div>
                      </MDBDropdownToggle>
                      <MDBDropdownMenu className="dropdown-default">
                        <div className="md-form my-0">
                          <input
                            className="form-control mr-sm-2"
                            type="text"
                            placeholder="  Search..."
                            aria-label="Search"
                            value={query}
                            onChange={this.onInputChange}
                          />
                        </div>
                        <MDBDropdownItem href="http://localhost:3000/playlist">
                          My playlist
                        </MDBDropdownItem>
                      </MDBDropdownMenu>
                    </MDBDropdown>
                  </MDBNavItem>
                }
              </MDBNavbarNav>
              <MDBNavbarBrand>
                <strong className="white-text">
                  <h1 style={{ fontFamily: "italic" }}>Find your music</h1>
                </strong>
              </MDBNavbarBrand>
              <MDBNavbarNav right>
                <MDBNavItem> </MDBNavItem>
                <MDBNavItem>
                  <MDBDropdown>
                    <MDBDropdownToggle nav caret>
                      <MDBIcon icon="user" />
                    </MDBDropdownToggle>
                    <MDBDropdownMenu className="dropdown-default">
                      <MDBDropdownItem href="#!" onClick={this.logout}>
                        Logout
                      </MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </MDBNavItem>
              </MDBNavbarNav>
            </MDBCollapse>
          </MDBNavbar>
        </div>
        {this.state.query === "" ? (
          <>
            <div style={{ marginTop: "15px" }}>
              <Cards />
            </div>
            <div class="col-4" style={{ marginTop: "-190px" }}>
              <CardCovid />{" "}
            </div>
            <div style={{ marginTop: "-370px", marginLeft: "33%" }}>
              <CarouselPage />
            </div>
          </>
        ) : (
          <div>{this.renderSearchResults()} </div>
        )}
        <div className="Search">
          <img
            src={Loader}
            className={`loader ${loading ? "show" : "hide"}`}
            alt="loader"
          />
          <ToastContainer />
        </div>
      </>
    );
  }
}
export default Home;
