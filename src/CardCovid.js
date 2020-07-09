import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";
import Corona from "./images/Corona.jpg";
const Example = (props) => {
  return (
    <div>
      <Card height="300px" width="100%">
        <CardImg src={Corona} alt="Card image cap" />
        <CardBody>
          <CardTitle>Coronavirus</CardTitle>
          <CardSubtitle>COVID-19 situation update worldwide</CardSubtitle>

          <Link to="/Covid">
            <Button>Covid Statistics</Button>
          </Link>
        </CardBody>
      </Card>
    </div>
  );
};

export default Example;
