import "./styles.css";

const imageFrame = document.querySelector(".image-frame");
const imageFrameWidth = getComputedStyle(imageFrame).width;
const imagesContainer = document.querySelector(".images");
const images = imagesContainer.getElementsByTagName("img");
const imageCount = images.length;
let currentId = 0;

function nextImageSlide() {
	let leftValue = parseInt(getComputedStyle(imagesContainer).left);
	unfillCircle();
	if (
		parseInt(imageFrameWidth) * imageCount + leftValue >
		parseInt(imageFrameWidth)
	) {
		imagesContainer.style.left =
			leftValue - parseInt(imageFrameWidth) + "px";
		currentId++;
	} else {
		imagesContainer.style.left = 0;
		currentId = 0;
	}
	fillCircle(document.querySelector(`div[data-id='${currentId}']`));
}

function previousImageSlide() {
	let leftValue = parseInt(getComputedStyle(imagesContainer).left);
	unfillCircle();
	if (leftValue < 0) {
		imagesContainer.style.left =
			leftValue + parseInt(imageFrameWidth) + "px";
		currentId--;
	} else {
		imagesContainer.style.left =
			-parseInt(imageFrameWidth) * (imageCount - 1) + "px";
		currentId = imageCount - 1;
	}
	fillCircle(document.querySelector(`div[data-id='${currentId}']`));
}

function addNavigationCircles() {
	const navigationCirclesContainer = document.querySelector(
		".navigation-circles",
	);
	for (let i = 0; i < imageCount; i++) {
		const div = document.createElement("div");
		div.className = "circle";
		div.setAttribute("data-id", i);
		div.addEventListener("click", () => {
			while (currentId < div.dataset.id) nextImageSlide();
			while (currentId > div.dataset.id) previousImageSlide();
		});
		navigationCirclesContainer.appendChild(div);
	}
}

function fillCircle(circle) {
	circle.classList.add("filled-circle");
}

function unfillCircle() {
	let filledCircle = document.querySelector(".filled-circle");
	if (filledCircle) filledCircle.classList.toggle("filled-circle");
}

function addImagesId() {
	let id = 0;
	for (let image of images) {
		image.setAttribute("data-id", id);
		id++;
	}
}

const previousImageButton = document.querySelector("button.previous-image");
const nextImageButton = document.querySelector("button.next-image");

previousImageButton.addEventListener("click", previousImageSlide);
nextImageButton.addEventListener("click", nextImageSlide);

addImagesId();
addNavigationCircles();
fillCircle(document.querySelector("div[data-id='0']"));

setInterval(nextImageSlide, 5000);
