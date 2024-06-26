//home

const ascii_container = document.getElementById("ascii-container");
let index = 0;
let asciiArt = "";

function animateAscii() {
  if (index < asciiArt.length) {
    if (asciiArt[index] === "\n") {
      ascii_container.innerHTML += "<br>";
    } else {
      ascii_container.innerHTML += asciiArt[index];
    }
    index++;
    setTimeout(animateAscii, 0.001);
  }
}

window.onload = function () {
  fetch("/assets/me.txt")
    .then((response) => response.text())
    .then((text) => {
      asciiArt = text.trim().replace(/^\s+/, "");
      animateAscii();
    })
    .catch((error) => console.error("Error fetching the text file:", error));
};

//about
const images = document.getElementsByClassName("image");

if (images.length != 0) {
  let globalIndex = 0,
    last = { x: 0, y: 0 };

  const activate = (image, x, y) => {
    image.style.left = `${x}px`;
    image.style.top = `${y}px`;
    image.style.zIndex = globalIndex;

    image.dataset.status = "active";

    last = { x, y };
  };

  const distanceFromLast = (x, y) => {
    return Math.hypot(x - last.x, y - last.y);
  };

  const handleOnMove = (e) => {
    if (distanceFromLast(e.clientX, e.clientY) > window.innerWidth / 20) {
      const lead = images[globalIndex % images.length],
        tail = images[(globalIndex - 5) % images.length];

      activate(lead, e.clientX, e.clientY);

      if (tail) tail.dataset.status = "inactive";

      globalIndex++;
    }
  };

  window.onmousemove = (e) => handleOnMove(e);
  window.ontouchmove = (e) => handleOnMove(e.touches[0]);
}

const ano = new Date().getFullYear();
if (document.getElementById("ano"))
  document.getElementById("ano").textContent = ano;

if (document.querySelector("html").getAttribute("data-page") !== "blog-post") {
  document.addEventListener("DOMContentLoaded", function () {
    const content = document.getElementById("content");

    let x = 0;
    let y = 0;

    window.addEventListener("mousemove", function (event) {
      x = event.pageX;
      y = event.pageY;

      const smoke = document.createElement("div");
      smoke.className = "smoke";

      smoke.style.left = `${x}px`;
      smoke.style.top = `${y}px`;

      content.appendChild(smoke);

      smoke.addEventListener("animationend", function () {
        smoke.remove();
      });
    });
  });
}

function getMostRecentPost() {
  fetch("blog.html")
    .then((response) => response.text())
    .then((html) => {
      const tempElement = document.createElement("div");
      tempElement.innerHTML = html;

      const postList = tempElement.querySelectorAll("#posts li");
      let mostRecentDate = null;
      let mostRecentPost = null;

      postList.forEach((post) => {
        postDate = post.children[1].textContent;
        if (mostRecentDate === null || postDate > mostRecentDate) {
          mostRecentDate = postDate;
          mostRecentPost = post;
        }
      });
      tempElement.remove();
      const linkElement = document.createElement("a");
      linkElement.href = mostRecentPost.firstChild.pathname;
      linkElement.textContent = mostRecentPost.firstChild.textContent;
      document.querySelector("#last-post").appendChild(linkElement);
    })
    .catch((error) => {
      console.error("Error fetching blog.html:", error);
    });
}
if (document.querySelector("html").getAttribute("data-page") == "home") {
  getMostRecentPost();
}
