import React from "react";
import {
  Card,
  CardImg,
  CardTitle,
  CardText,
  CardColumns,
  CardSubtitle,
  CardBody,
} from "reactstrap";
import Usher from "./images/Usher.jpg";
import Putin from "./images/Putin.jpg";
import Camelia from "./images/Camelia.jpg";
import ReactPlayer from "react-player";
const Cards = (props) => {
  return (
    <>
      <CardColumns>
        <Card>
          <CardImg top width="100%" src={Usher} alt="Card image cap" />
          <CardBody>
            <CardTitle className="indigo-text">
              Listen to Usher’s New Song “I Cry”
            </CardTitle>
            <CardText>
              Usher has shared a new song called “I Cry.” According to the
              singer-songwriter, the track is “inspired by wanting to teach
              [his] sons that it is OK for a man to feel emotions deeply and
              cry,” and was completed after he became “very depressed thinking
              about all sons who have lost their fathers to police brutality,
              social injustice, and violence; the daughters and mothers too.”
              Listen to it below..
            </CardText>
            <a
              target="blank"
              class="btn btn-dark"
              href="https://www.youtube.com/watch?v=Nag1L8OYY-4&feature=emb_title"
              role="button"
            >
              Listen
            </a>
          </CardBody>
        </Card>
        <Card>
          <CardImg top width="100%" src={Camelia} alt="Card image cap" />
        </Card>
        <Card>
          <CardBody>
            <CardTitle className="purple-text">
              Camila Cabello's emotional 'FIRST MAN' video
            </CardTitle>
            <CardSubtitle className="purple-text">
              The video was a compilation of home movies dedicated to the
              singers's dad on FATHER'S DAY
            </CardSubtitle>
            <CardText>
              Camila and her father have a particularly special
              relationship."Papa, I made this for you," Camila wrote in an
              Instagram post
            </CardText>
            <a
              target="blank"
              class="btn btn-dark"
              href="https://www.youtube.com/watch?v=afeisEQa5l8"
              role="button"
            >
              Listen
            </a>
          </CardBody>
        </Card>
        {/* <Card
        body
        inverse
        style={{ backgroundColor: "#333", borderColor: "#333" }}
      > */}
        {/* </Card> */}
        <Card>
          <CardImg top width="100%" src={Putin} alt="Card image cap Putin" />
          <CardBody>
            <CardTitle className="purple-text">
              Pro-Putin rapper sets record for unpopularity on Russian YouTube
            </CardTitle>
            <CardSubtitle className="purple-text">
              Timati pulls latest music video from site after it received 1.48m
              dislikes
            </CardSubtitle>
            <CardText>
              A Russian rapper who describes himself as Vladimir Putin’s best
              friend has pulled his latest pro-Kremlin music video from YouTube
              after it set a new record for online unpopularity. The track,
              entitled Moscow, was released by Timati on the eve of Sunday’s
              city council elections in the Russian capital..
            </CardText>
          </CardBody>
        </Card>
        {/* <Card body inverse color="primary">
        <CardTitle>Special Title Treatment</CardTitle>
        <CardText>
          With supporting text below as a natural lead-in to additional content.
        </CardText>
        <Button color="secondary">Button</Button>
      </Card> */}
      </CardColumns>
      <div style={{ marginLeft: "34%", marginTop: "-180px" }}>
        <ReactPlayer
          width="100%"
          controls={true}
          url="https://www.youtube.com/watch?v=r67gj1FrPIc"
        />
      </div>
    </>
  );
};
export default Cards;
