// import "./../sass/main.scss";
/*import "./../sass/_base.scss"; */

const track = document.getElementById("slider-track");
const thumb = document.getElementById("slider-thumb");
const run = document.getElementById("slider-run");
const views = document.querySelector(".pricing-card__top-views");
const price = document.querySelector(".pricing-card__top-price--number");

let mousePosition;
let thumbPositionX;
let thumbOffsetX;
let offset = [0, 0];
let div;
let isDown = false;
let rect = track.getBoundingClientRect();
let max_offset = rect.right - rect.left;
var min_offset = 0;
let step = max_offset / 4;

let minValue = 10;
let maxValue = 1000;
function thumbPressed(e, isMobile) {
  console.log("thumb is down");

  isDown = true;
  if (isMobile) {
    thumbOffsetX = thumb.offsetLeft - e.changedTouches[0].clientX;
  } else {
    thumbOffsetX = thumb.offsetLeft - e.clientX;
  }

  //console.log("thumbOffsetX: ", thumbOfffsetX);
  thumb.classList.add("pressed");
}

function thumbFree() {
  isDown = false;
  thumb.classList.remove("pressed");
}

thumb.addEventListener(
  "mousedown",
  (e) => {
    thumbPressed(e, false);
  },
  false
);
/* thumb.addEventListener(
  "mousedown",
  function (e) {
    console.log("mouse is down");

    isDown = true;
    offset = [thumb.offsetLeft - e.clientX, thumb.offsetTop - e.clientY];
    thumb.classList.add("pressed");
  },
  true
); */

thumb.addEventListener("touchstart", (e) => {
  //   isDown = true;
  //   // offset = [thumb.offsetLeft - e.clientX, thumb.offsetTop - e.clientY];
  //   thumbOffsetX = thumb.offsetLeft - e.changedTouches[0].clientX;
  //   thumb.classList.add("pressed");
  thumbPressed(e, true);
});

document.addEventListener("mouseup", thumbFree);
thumb.addEventListener("touchend", thumbFree, false);

/* document.addEventListener("mouseup", function () {
  isDown = false;
  thumb.classList.remove("pressed");
}); */

//touchmove

//vedere qui https://stackoverflow.com/questions/48698441/jquery-ui-draggable-split-screen
function thumbMove(e) {
  e.preventDefault();
  if (isDown) {
    mousePosition = {
      x: e.clientX,
      y: e.clientY,
    };
    let currentLeft = mousePosition.x + offset[0];
    let currentViews = calcCurrentViewsLabel(currentLeft);
    if (currentLeft <= max_offset && currentLeft >= min_offset) {
      let currentViews = calcCurrentViewsLabel(currentLeft);
      if (currentViews === 1000) {
        views.innerHTML = `1M PageViews`;
      } else {
        views.innerHTML = `${currentViews}K PageViews`;
      }
      price.innerHTML = `$${calcCurrentPrice(currentViews)}.00`;
      thumb.style.left = thumb.style.left = mousePosition.x + offset[0] + "px";
      run.style.width = mousePosition.x + offset[0] + "px";
    }
    console.log("offsetLeft:", thumb.offsetLeft);
  }
}

document.addEventListener("mousemove", (e) => {
  //thumbMove(e);
  moveThumb(e, false);
});

//STO CAMBIANDO QUESTO PEZZO
thumb.addEventListener("touchmove", (e) => {
  moveThumb(e, true);
});
/* thumb.addEventListener("touchmove", (e) => {
  console.log("touchmove ", e.changedTouches[0].clientX);
  //thumbMove(e);
  e.preventDefault();
  if (isDown) {
    thumbPositionX = e.changedTouches[0].clientX;
  }
  let currentLeft = thumbPositionX + thumbOffsetX;

  if (currentLeft <= max_offset && currentLeft >= min_offset) {
    let currentViews = calcCurrentViewsLabel(currentLeft);
    if (currentViews === 1000) {
      views.innerHTML = `1M PageViews`;
    } else {
      views.innerHTML = `${currentViews}K PageViews`;
    }
    price.innerHTML = `$${calcCurrentPrice(currentViews)}.00`;
    thumb.style.left = thumb.style.left = thumbPositionX + thumbOffsetX + "px";
    run.style.width = thumbPositionX + thumbOffsetX + "px";
  } else if (currentLeft > max_offset) {
    views.innerHTML = `1M PageViews`;
    price.innerHTML = `$${calcCurrentPrice(maxValue)}.00`;
    thumb.style.left = thumb.style.left = max_offset + "px";
    run.style.width = max_offset + "px";
  } else if (currentLeft < min_offset) {
    views.innerHTML = `${calcCurrentViewsLabel(min_offset)}K PageViews`;
    price.innerHTML = `$${calcCurrentPrice(min_offset)}.00`;
    thumb.style.left = thumb.style.left = min_offset + "px";
    run.style.width = min_offset + "px";
  }
}); */

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

  if (currentLeft <= max_offset && currentLeft >= min_offset) {
    let currentViews = calcCurrentViewsLabel(currentLeft);
    if (currentViews === 1000) {
      views.innerHTML = `1M PageViews`;
    } else {
      views.innerHTML = `${currentViews}K PageViews`;
    }
    price.innerHTML = `$${calcCurrentPrice(currentViews)}.00`;
    thumb.style.left = thumb.style.left = thumbPositionX + thumbOffsetX + "px";
    run.style.width = thumbPositionX + thumbOffsetX + "px";
  } else if (currentLeft > max_offset) {
    views.innerHTML = `1M PageViews`;
    price.innerHTML = `$${calcCurrentPrice(maxValue)}.00`;
    thumb.style.left = thumb.style.left = max_offset + "px";
    run.style.width = max_offset + "px";
  } else if (currentLeft < min_offset) {
    views.innerHTML = `${calcCurrentViewsLabel(min_offset)}K PageViews`;
    price.innerHTML = `$${calcCurrentPrice(min_offset)}.00`;
    thumb.style.left = thumb.style.left = min_offset + "px";
    run.style.width = min_offset + "px";
  }
}

/* document.addEventListener(
  "mousemove",
  function (event) {
    event.preventDefault();
    if (isDown) {
      mousePosition = {
        x: event.clientX,
        y: event.clientY,
      };
      let currentLeft = mousePosition.x + offset[0];
      let currentViews = calcCurrentViewsLabel(currentLeft);
      if (currentLeft <= max_offset && currentLeft >= min_offset) {
        let currentViews = calcCurrentViewsLabel(currentLeft);
        if (currentViews === 1000) {
          views.innerHTML = `1M PageViews`;
        } else {
          views.innerHTML = `${currentViews}K PageViews`;
        }
        price.innerHTML = `$${calcCurrentPrice(currentViews)}.00`;

        let numberOfViews = calcCurrentViewsLabel(currentLeft);
        thumb.style.left = thumb.style.left =
          mousePosition.x + offset[0] + "px";
        run.style.width = mousePosition.x + offset[0] + "px";
      }
      console.log("offsetLeft:", thumb.offsetLeft);
    }
  },
  true
); */

const calcCurrentViewsLabel = (offsetLeft) => {
  let currentMin = 0;
  let currentMax = step - 1;
  let currentOffset = offsetLeft;
  console.log(offsetLeft);
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
    currentMax = max_offset;
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
