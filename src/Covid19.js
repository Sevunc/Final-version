import React from "react";
import axios from "axios";
import fire from "./config/fire";
import TimeAgoRenderer from "./TimeAgoRenderer";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import mask from "./mask.jpg";
import { MDBIcon, MDBNavbar, MDBBtn } from "mdbreact";
import { Link } from "react-router-dom";

export default class Covid19 extends React.Component {
  constructor(props) {
    super(props);
    this.onClickHome = this.onClickHome.bind(this);
    this.state = {
      collapseID: "",
      user: {},
      geoUrl:
        "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json",
      home: false,
      arrLat: [],
      arrLong: [],
      columnDefs: [
        {
          headerName: "Country",
          field: "countryRegion",
          sortable: true,
          filter: true,
          checkboxSelection: true,
        },
        {
          headerName: "Confirmed",
          field: "confirmed",
          sortable: true,
          filter: true,
        },
        {
          headerName: "Recovered",
          field: "recovered",
          sortable: true,
          filter: true,
        },
        { headerName: "Deaths", field: "deaths", sortable: true, filter: true },
        {
          headerName: "Last Uptade",
          field: "lastUpdate",
          sortable: true,
          filter: true,
          cellRenderer: "timeAgo",
        },
      ],
      rowData: [],
      frameworkComponents: {
        timeAgo: TimeAgoRenderer,
      },
    };
  }
  componentDidMount() {
    axios
      .get("https://covid19.mathdro.id/api/confirmed")
      .then((response) => {
        let arrMain = [];
        let arrProvince = [];
        let arrMutual = [];
        let arrSeparate = [];
        let arr1 = [];
        let arr2 = [];
        //console.log(response);
        for (let n = 0; n < response.data.length; n++) {
          arr1.push(response.data[n].lat);
        }
        for (let a = 0; a < response.data.length; a++) {
          arr2.push(response.data[a].long);
        }
        for (let i = 0; i < response.data.length; i++) {
          if (!response.data[i].provinceState) {
            arrMain.push(response.data[i]);
          } else {
            arrProvince.push(response.data[i]);
          }
        }
        for (let j = 0; j < arrProvince.length; j++) {
          if (!arrMutual.includes(arrProvince[j].countryRegion)) {
            arrMutual.push(arrProvince[j].countryRegion);
          }
        }
        for (let k = 0; k < arrMutual.length; k++) {
          arrSeparate.push({
            countryRegion: arrMutual[k],
            lastUpdate: arrMutual[k],
            confirmed: 0,
            recovered: 0,
            deaths: 0,
          });
        }
        for (let f = 0; f < arrSeparate.length; f++) {
          for (let e = 0; e < arrProvince.length; e++) {
            if (arrSeparate[f].countryRegion === arrProvince[e].countryRegion) {
              arrSeparate[f].confirmed += arrProvince[e].confirmed;
              arrSeparate[f].recovered += arrProvince[e].recovered;
              arrSeparate[f].deaths += arrProvince[e].deaths;
              arrSeparate[f].lastUpdate = arrProvince[e].lastUpdate;
            }
          }
        }
        for (let g = 0; g < arrMain.length; g++) {
          for (let d = 0; d < arrSeparate.length; d++) {
            if (arrSeparate[d].countryRegion === arrMain[g].countryRegion) {
              arrMain[g].confirmed += arrSeparate[d].confirmed;
              arrMain[g].recovered += arrSeparate[d].recovered;
              arrMain[g].deaths += arrSeparate[d].deaths;
              arrMain[g].lastUpdate = arrSeparate[d].lastUpdate;
              arrSeparate.splice(d, 1);
            }
          }
        }
        for (let z = 0; z < arrSeparate.length; z++) {
          arrMain.unshift(arrSeparate[z]);
        }
        this.setState({ rowData: arrMain });
        this.setState({ arrLat: arr1 });
        this.setState({ arrLong: arr2 });
      })
      .catch((error) => {
        console.log(error);
      });
    this.authListener();
  }
  onClickHome() {
    this.setState({ home: true });
  }
  authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: null });
      }
    });
  };
  toggleCollapse = (collapseID) => () =>
    this.setState((prevState) => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : "",
    }));
  render() {
    console.log(this.state.arrLat);
    console.log(this.arr);
    return (
      <>
        <MDBNavbar color="black">
          <div>
            <Link to="/">
              <MDBBtn>Back to LoginPage</MDBBtn>{" "}
            </Link>
          </div>
          {this.state.user ? (
            <div style={{ display: "block" }}>
              <Link to="/Home">
                <MDBIcon icon="user" />{" "}
              </Link>
            </div>
          ) : (
            <div style={{ display: "none" }}>
              <Link to="/Home">
                {" "}
                <MDBIcon icon="user" />{" "}
              </Link>
            </div>
          )}
        </MDBNavbar>
        <div
          className="ag-theme-alpine-dark"
          style={{ height: "550px", width: "75%" }}
        >
          <AgGridReact
            columnDefs={this.state.columnDefs}
            rowData={this.state.rowData}
            rowSelection="multiple"
            frameworkComponents={this.state.frameworkComponents}
          ></AgGridReact>{" "}
          <img
            src={mask}
            alt="Mask"
            style={{ marginTop: "-65%", marginLeft: "100%", width: "35%" }}
          ></img>
        </div>
      </>
    );
  }
}
