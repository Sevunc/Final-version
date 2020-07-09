import React from "react";
import {
  MDBCarousel,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBView,
  MDBContainer,
} from "mdbreact";
import musiclogo from "./images/big.jpg";
import newb from "./images/musico.png";
import imgg from "./images/imgg.jpg";
const CarouselPage = () => {
  return (
    <MDBContainer>
      <MDBCarousel
        activeItem={1}
        length={3}
        showControls={false}
        showIndicators={false}
        //className="z-depth-1"
        slide={true}
      >
        <MDBCarouselInner>
          <MDBCarouselItem itemId="1">
            <MDBView>
              <a href="https://www.deezer.com/ru/" target="blank">
                <img
                  width="100%"
                  height="370px"
                  // className="d-block w-100"
                  src={newb}
                  alt="First slide"
                />
              </a>
            </MDBView>
          </MDBCarouselItem>
          <MDBCarouselItem itemId="2">
            <MDBView>
              <a href="https://www.deezer.com/ru/" target="blank">
                <img
                  width="100%"
                  height="370px"
                  // className="d-block w-100"
                  src={musiclogo}
                  alt="Second slide"
                />
              </a>
            </MDBView>
          </MDBCarouselItem>
          <MDBCarouselItem itemId="3">
            <MDBView>
              <a href="https://www.deezer.com/ru/" target="blank">
                <img
                  width="100%"
                  height="370px"
                  // className="d-block w-100"
                  src={imgg}
                  alt="Third slide"
                />
              </a>
            </MDBView>
          </MDBCarouselItem>
        </MDBCarouselInner>
      </MDBCarousel>
    </MDBContainer>
  );
};
export default CarouselPage;
