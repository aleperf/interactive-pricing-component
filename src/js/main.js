// import "./../sass/main.scss";
/*import "./../sass/_base.scss"; */

const track = document.getElementById("slider-track");
const thumb = document.getElementById("slider-thumb");
const run = document.getElementById("slider-run");
const views = document.querySelector(".pricing-card__top-views");
const price = document.querySelector(".pricing-card__top-price--number");

//let mousePosition;
let thumbPositionX;
let thumbOffsetX;
let isDown = false;

const rect = track.getBoundingClientRect();
const maxOffset = rect.right - rect.left;
const minOffset = 0;
const step = maxOffset / 4;

let minValue = 10;
let maxValue = 1000;

//TIER VIEWS AND PRICES

//---------------------- MOVING THE THUMB SLIDER ------------------------------------------

function thumbPressed(e, isMobile) {
  isDown = true;
  if (isMobile) {
    thumbOffsetX = thumb.offsetLeft - e.changedTouches[0].clientX;
  } else {
    thumbOffsetX = thumb.offsetLeft - e.clientX;
  }
  thumb.classList.add("pressed");
}

function thumbFree() {
  isDown = false;
  thumb.classList.remove("pressed");
}

function updateThumbPosition(currentLeft) {
  console.log("calling this");
  if (currentLeft <= maxOffset && currentLeft >= minOffset) {
    let currentViews = calcCurrentViewsLabel(currentLeft);
    if (currentViews === 1000) {
      views.innerHTML = `1M PageViews`;
    } else {
      views.innerHTML = `${currentViews}K PageViews`;
    }
    price.innerHTML = `$${calcCurrentPrice(currentViews)}.00`;
    //thumb.style.left = thumb.style.left = thumbPositionX + thumbOffsetX + "px";
    thumb.style.left = thumb.style.left = currentLeft + "px";
    //run.style.width = thumbPositionX + thumbOffsetX + "px";
    run.style.width = currentLeft + "px";
  } else if (currentLeft > maxOffset) {
    views.innerHTML = `1M PageViews`;
    price.innerHTML = `$${calcCurrentPrice(maxValue)}.00`;
    thumb.style.left = thumb.style.left = maxOffset + "px";
    run.style.width = maxOffset + "px";
  } else if (currentLeft < minOffset) {
    views.innerHTML = `${calcCurrentViewsLabel(minOffset)}K PageViews`;
    price.innerHTML = `$${calcCurrentPrice(minOffset)}.00`;
    thumb.style.left = thumb.style.left = minOffset + "px";
    run.style.width = minOffset + "px";
  }
}

function moveThumb(e, isMobile) {
  e.preventDefault();
  if (isDown) {
    if (isMobile) {
      thumbPositionX = e.changedTouches[0].clientX;
    } else {
      thumbPositionX = e.clientX;
    }
  }
  let currentLeft = thumbPositionX + thumbOffsetX;
  updateThumbPosition(currentLeft);
}

// -------------------------- ADDING SLIDER LISTENERS ------------------------------

//SLIDER LISTENERS ON DESKTOP (MOUSE)
thumb.addEventListener(
  "mousedown",
  (e) => {
    thumbPressed(e, false);
  },
  false
);

document.addEventListener("mouseup", thumbFree);

document.addEventListener("mousemove", (e) => {
  moveThumb(e, false);
});

//SLIDER LISTENERS ON MOBILE (TOUCHSCREEN)

thumb.addEventListener("touchstart", (e) => {
  thumbPressed(e, true);
});

thumb.addEventListener("touchend", thumbFree, false);

thumb.addEventListener("touchmove", (e) => {
  moveThumb(e, true);
});

const calcCurrentViewsLabel = (offsetLeft) => {
  let currentOffset = offsetLeft;

  if (offsetLeft < step) {
    minValue = 10;
    maxValue = 49;
  } else if (offsetLeft < step * 2) {
    minValue = 50;
    maxValue = 99;
    currentOffset = offsetLeft - step;
    currentMin = step;
    currentMax = step * 2 - 1;
  } else if (offsetLeft < step * 3) {
    minValue = 100;
    maxValue = 499;
    currentOffset = offsetLeft - step * 2;
    currentMin = step * 2;
    currentMax = step * 3 - 1;
  } else {
    currentMin = step * 3;
    currentMax = maxOffset;
    currentOffset = offsetLeft - step * 3;
    minValue = 500;
    maxValue = 1000;
  }

  return Math.round(minValue + (currentOffset / step) * (maxValue - minValue));
};

const calcCurrentPrice = (currentViews) => {
  if (currentViews < 50) {
    return 8;
  } else if (currentViews < 100) {
    return 12;
  } else if (currentViews < 500) {
    return 16;
  } else if (currentViews < 1000) {
    return 24;
  } else {
    return 36;
  }
};
