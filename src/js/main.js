// import "./../sass/main.scss";
/*import "./../sass/_base.scss"; */

const track = document.getElementById("slider-track");
const thumb = document.getElementById("slider-thumb");
const run = document.getElementById("slider-run");
const views = document.querySelector(".pricing-card__top-views");
const price = document.querySelector(".pricing-card__top-price--number");

const checkbox = document.getElementById("payment-checkbox");

//let mousePosition;
let thumbPositionX;
let thumbOffsetX;
let isDown = false;

let rect = track.getBoundingClientRect();
let maxOffset = rect.right - rect.left;
const minOffset = 0;
let step = maxOffset / 4;

let minValue = 10;
let maxValue = 1000;

let isChecked = false;
let currentViews = 100;

//checkbox listener

checkbox.addEventListener("change", (e) => {
  if (e.target.checked) {
    isChecked = true;
  } else {
    isChecked = false;
  }
});

/**
 * - 10K pageviews / $8 per month
- 50K pageviews / $12 per month
- 100K pageviews / $16 per month
- 500k pageviews / $24 per month
- 1M pageviews / $36 per month
 * 0-49 50-99 100-499 499-1000
 * 
 */

//INTIALIZE VALUES ON ROTATION CHANGE AND REPOSITION THUMB

window.addEventListener("resize", (e) => {
  const track = document.getElementById("slider-track");
  rect = track.getBoundingClientRect();
  maxOffset = rect.right - rect.left;
  let step = maxOffset / 4;
  let cLeft = getPositionFromViews(currentViews, maxOffset, step);
  thumb.style.left = thumb.style.left = cLeft + "px";
  run.style.width = cLeft + "px";
});

function getPositionFromViews(views, maxOffset, step) {
  let min = 0;
  if (views === 10) {
    return 0;
  } else if (views < 50) {
    return Math.round((step / 40) * views);
  } else if (views < 100) {
    return step + (step / 49) * (views - 50);
  } else if (views < 500) {
    return 2 * step + (step / 500) * (views - 100);
  } else if (views < 1000) {
    return 3 * step + (step / 500) * (views - 500);
  } else {
    return maxOffset;
  }
}

//---------------------- MOVING THE SLIDER THUMB------------------------------------------

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
  if (currentLeft <= maxOffset && currentLeft >= minOffset) {
    currentViews = calcCurrentViewsLabel(currentLeft);
    if (currentViews === 1000) {
      views.innerHTML = `1M PageViews`;
    } else {
      views.innerHTML = `${currentViews}K PageViews`;
    }
    price.innerHTML = `$${calcCurrentPrice(currentViews)}.00`;
    thumb.style.left = thumb.style.left = currentLeft + "px";
    run.style.width = currentLeft + "px";
  } else if (currentLeft > maxOffset) {
    views.innerHTML = `1M PageViews`;
    price.innerHTML = `$${calcCurrentPrice(maxValue)}.00`;
    thumb.style.left = thumb.style.left = maxOffset + "px";
    run.style.width = maxOffset + "px";
    currentViews = 1000;
  } else if (currentLeft < minOffset) {
    views.innerHTML = `${calcCurrentViewsLabel(minOffset)}K PageViews`;
    price.innerHTML = `$${calcCurrentPrice(minOffset)}.00`;
    thumb.style.left = thumb.style.left = minOffset + "px";
    run.style.width = minOffset + "px";
    currentViews = 10;
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

thumb.addEventListener("mousemove", (e) => {
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
  let price;
  if (currentViews < 50) {
    price = 8;
  } else if (currentViews < 100) {
    price = 12;
  } else if (currentViews < 500) {
    price = 16;
  } else if (currentViews < 1000) {
    price = 24;
  } else {
    price = 36;
  }

  if (isChecked) {
    return price - price * 0.25;
  } else {
    return price;
  }
};
