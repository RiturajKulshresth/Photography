import React, { Component } from "react";
import "./imageslider.css"; // Import CSS file for styling
import { images } from "./images";
import { Modal } from "@mui/material";
import ModalContent from "./ModalContent";

class ImageSlider extends Component {
  state = {
    currentImageIndex: 0,
    backgroundImageUrl: images.length > 0 ? images[0].small : "",
    isModalOpen: false,
    isEventListenerActive: true,
  };
  handleImageChange = (index) => {
    this.setState({ currentImageIndex: index });
    const backgroundElement = document.getElementById("background-image");
    backgroundElement.classList.add("fade-out");
    setTimeout(() => {
      backgroundElement.style.backgroundImage = `url(${images[index].small})`;
      backgroundElement.classList.remove("fade-out");
    }, 500); // Adjust the delay to match the transition duration
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
    this.setState({ isEventListenerActive: false });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
    this.setState({ isEventListenerActive: true });
  };

  handleOnDown = (e) => {
    const track = document.getElementById("image-track");
    const touch = e.type === "touchstart" ? e.changedTouches[0] : e;
    track.dataset.mouseDownAt = touch.clientX;
    document.body.classList.add("blur-background");
  };

  handleOnUp = () => {
    const track = document.getElementById("image-track");
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
  };

  handleOnMove = (e) => {
    const track = document.getElementById("image-track");
    const touch = e.type === "touchmove" ? e.changedTouches[0] : e;
    if (track.dataset.mouseDownAt === "0") return;

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - touch.clientX,
      maxDelta = window.innerWidth / 2;

    const percentage = (mouseDelta / maxDelta) * -100,
      nextPercentageUnconstrained =
        parseFloat(track.dataset.prevPercentage) + percentage,
      nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

    track.dataset.percentage = nextPercentage;

    track.animate(
      [
        { transform: `translate(${track.dataset.percentage}%, -50%)` },
        { transform: `translate(${nextPercentage}%, -50%)` },
      ],
      { duration: 1200, fill: "forwards" }
    );

    const images = track.getElementsByClassName("image");
    for (const image of images) {
      image.animate(
        [
          {
            objectPosition: `${
              100 + parseFloat(track.dataset.percentage)
            }% center`,
          },
          { objectPosition: `${100 + nextPercentage}% center` },
        ],
        { duration: 1200, fill: "forwards" }
      );
    }

    const center = window.innerWidth / 2;
    let closestIndex = 0;
    let minDistance = Infinity;
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      const rect = image.getBoundingClientRect();
      const distance = Math.abs(rect.left + rect.width / 2 - center);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = i;
      }
    }

    this.setState({ currentImageIndex: closestIndex });
    this.setState({
      backgroundImageUrl: images[this.state.currentImageIndex].small,
    });
  };

  componentDidMount() {
    this.addEventListeners();
  }

  componentDidUpdate(prevProps, prevState) {
    // Check if modal state has changed and update event listener accordingly
    if (prevState.isModalOpen !== this.state.isModalOpen) {
      if (this.state.isModalOpen) {
        this.removeEventListeners();
      } else {
        this.addEventListeners();
      }
    }
  }

  componentWillUnmount() {
    this.removeEventListeners();
  }

  addEventListeners = () => {
    window.addEventListener("mousedown", this.handleOnDown);
    window.addEventListener("touchstart", this.handleOnDown);
    window.addEventListener("mouseup", this.handleOnUp);
    window.addEventListener("touchend", this.handleOnUp);
    window.addEventListener("mousemove", this.handleOnMove);
    window.addEventListener("touchmove", this.handleOnMove);
  };

  removeEventListeners = () => {
    window.removeEventListener("mousedown", this.handleOnDown);
    window.removeEventListener("touchstart", this.handleOnDown);
    window.removeEventListener("mouseup", this.handleOnUp);
    window.removeEventListener("touchend", this.handleOnUp);
    window.removeEventListener("mousemove", this.handleOnMove);
    window.removeEventListener("touchmove", this.handleOnMove);
  };

  render() {
    const { currentImageIndex, isModalOpen } = this.state;
    const backgroundImageUrl =
      images.length > 0 ? images[currentImageIndex].small : "";

    return (
      <div className="container">
        <div
          id="background-image"
          style={{ backgroundImage: `url(${backgroundImageUrl})` }}
        ></div>

        <div id="image-track" data-mouse-down-at="0" data-prev-percentage="0">
          {images.map((image, index) => (
            <img
              key={index}
              className="image"
              src={image.regular}
              draggable="false"
              alt={image.alt}
              onClick={() => {
                this.handleImageChange(index);
                this.openModal();
              }}
            />
          ))}
        </div>
        <Modal
          open={isModalOpen}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          //   disableBackdropClick
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: "10px",
          }}
        >
          <ModalContent
            // imageUrl={this.state.backgroundImageUrl}
            imageUrl={images[currentImageIndex].full}
            onClose={this.closeModal}
          />
        </Modal>
      </div>
    );
  }
}

export default ImageSlider;
