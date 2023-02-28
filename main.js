<<<<<<< HEAD
//about
const images = document.getElementsByClassName("image");

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
=======
const ano = new Date().getFullYear();
document.getElementById("ano").textContent = ano;
>>>>>>> 526416a391a81057ca1af4a7b31da7867ab1fe66
