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
document.getElementById("ano").textContent = ano;

document.addEventListener("DOMContentLoaded", function () {
  const follower = document.getElementById("follower");
  const inertia = 0.1;

  let x = 0;
  let y = 0;
  window.addEventListener("mousemove", function (event) {
    x = event.pageX;
    y = event.pageY;
  });

  window.ontouchmove = (event) => {
    if (event.touches.length === 1) {
      x = event.touches[0].pageX;
      y = event.touches[0].pageY;
    }
  };

  function updateFollower() {
    const currentX = parseFloat(follower.style.left || 0);
    const currentY = parseFloat(follower.style.top || 0);

    const dx = (x - currentX) * inertia;
    const dy = (y - currentY) * inertia;

    follower.style.left = currentX + dx + "px";
    follower.style.top = currentY + dy + "px";

    requestAnimationFrame(updateFollower);
  }

  updateFollower();
});
