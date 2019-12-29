const naviBack = document.getElementById("navigation-background");
const naviBtn = document.getElementById("navi-button");
const secAbout = document.getElementById("section-about");
const compPhotos = document.getElementsByClassName("composition__photo");
const secFeature = document.getElementById("section-features");
const featBoxs = document.getElementsByClassName("feature-box");
const secTour = document.getElementById("section-tours");
const cardBack = document.getElementsByClassName("card__side");

function isNodeList(nodes) {
  try {
    if (nodes(0) === null || (nodes(0) && nodes(0).tagName)) return true;
  } catch (e) {
    return false;
  }
  return false;
}

const handleWillChanges = (elem, target, value) => {
  elem.addEventListener("mouseenter", () => {
    [...target].forEach(t => (t.style.willChange = value));
  });

  const onMouseLeave = () => {
    setTimeout(() => {
      [...target].forEach(t => (t.style.willChange = "auto"));
    }, 3000);
  };

  elem.addEventListener("mouseleave", () => {
    onMouseLeave();
  });
};

const handleWillChange = (elem, target, value) => {
  elem.addEventListener("mouseenter", () => {
    target.style.willChange = value;
  });

  const onMouseLeave = () => {
    setTimeout(() => {
      target.style.willChange = "auto";
    }, 2000);
  };

  elem.addEventListener("mouseleave", () => {
    onMouseLeave();
  });
};

handleWillChange(naviBtn, naviBack, "transform, opacity");
// handleWillChanges(secAbout, compPhotos, "transform");
// handleWillChanges(secFeature, featBoxs, "transform, opacity");
// handleWillChanges(secTour, cardBack, "transform");

// * Lazy Load Pictures
const images = document.querySelectorAll("[data-src]");
const imageSets = document.querySelectorAll("[data-srcset]");

const imgOptions = {
  threshold: 0,
  rootMargin: "0px 0px 200px 0px"
};

function preloadImage(img) {
  const src = img.getAttribute("data-src");

  if (!src) {
    return;
  }

  console.log(`Function preloadImage executed ${src}`);
  img.src = src;
}

function preloadImageSet(imgSet) {
  const srcSet = imgSet.getAttribute("data-srcset");

  if (!srcSet) {
    return;
  }

  console.log(`Function preloadImageSet executed ${srcSet}`);
  imgSet.srcSet = srcSet;
}

const imgObserver = new IntersectionObserver((entries, imgObserver) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      return;
    }

    preloadImage(entry.target);
    imgObserver.unobserve(entry.target);
  });
}, imgOptions);

images.forEach(image => {
  console.log(`Observing image ${image}`);
  imgObserver.observe(image);
});

const imageSetObserver = new IntersectionObserver(
  (entries, imageSetObserver) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      }

      preloadImageSet(entry.target);
      imageSetObserver.unobserve(entry.target);
    });
  },
  imgOptions
);

imageSets.forEach(imageSet => {
  console.log(`Observing src-set ${imageSet}`);
  imageSetObserver.observe(imageSet);
});

// * Text Animations
const text = document.querySelector(".heading-fancy");

function fancier(elem) {
  const characters = elem.textContent.split("");

  // blank out the element before adding each character back inside of <span>'s
  elem.textContent = "";
  characters.forEach(char => (elem.innerHTML += `<span>${char}</span>`));

  let char = 0;

  let timeout = setTimeout(() => {
    let timer = setInterval(onTick, 90);
  }, 300);

  function onTick() {
    const span = elem.querySelectorAll("span")[char];
    span.classList.add("fade");

    if (char === characters.length - 1) {
      complete();
      return;
    }

    char++;
  }

  function complete() {
    // clearInterval(timer);
    clearTimeout(timeout);
    return;
  }
}

fancier(text);

// * Video playback
const vid = document.getElementById("bgvideo");
// vid.defaultPlaybackRate = 0.1;

const slow = 0.65;
const normal = 1.0;

function slowMotionVideo(elem, rate) {
  // const t = setTimeout(() => {
  if (elem.readyState === 4) {
    console.log(`Changing ${elem}'s playback rate to ${rate}`);
    elem.defaultPlaybackRate = rate;
    elem.playbackRate = rate;
    elem.load();
    elem.play();
    console.log(`Changed ${elem}'s playback rate to ${elem.playbackRate}`);
  }
  // }, 1200);
}

// slowMotionVideo(vid, slow);

vid.addEventListener("canplaythrough", () => {
  slowMotionVideo(vid, slow);
});
