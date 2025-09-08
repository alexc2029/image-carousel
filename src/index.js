import "./styles.css";

const imageFrame = document.querySelector(".image-frame");
const imageFrameWidth = getComputedStyle(imageFrame).width;
const imagesContainer = document.querySelector(".images");
const images = imagesContainer.getElementsByTagName("img");
const imageCount = images.length;

function nextImageSlide() {
	let leftValue = parseInt(getComputedStyle(imagesContainer).left);
	if (
		parseInt(imageFrameWidth) * imageCount + leftValue >
		parseInt(imageFrameWidth)
	) {
		imagesContainer.style.left =
			leftValue - parseInt(imageFrameWidth) + "px";
	}
}

function previousImageSlide() {
	let leftValue = parseInt(getComputedStyle(imagesContainer).left);
	if (leftValue < 0) {
		imagesContainer.style.left =
			leftValue + parseInt(imageFrameWidth) + "px";
	}
}

const previousImageButton = document.querySelector("button.previous-image");
const nextImageButton = document.querySelector("button.next-image");

previousImageButton.addEventListener("click", previousImageSlide);
nextImageButton.addEventListener("click", nextImageSlide);
