const honk = document.getElementById("honk");
const toggle = document.getElementById("toggle");
let chaos = false;
let geese = [];

const memes = ["/Images/meme1.png"];
const notes = [
  "HONK! 🪿",
  "Quack??",
  "Mine now!",
  "Your cursor belongs to me.",
  "Fear the goose.",
  "Chaos reigns.",
  "I live here now.",
  "Untitled Goose vibes.",
  "No gods, no masters.",
  "Honk if you love memes.",
  "404: Bread not found.",
  "Where’s the bread?",
  "Stealing snacks...",
  "Carbs are life.",
  "Got any grapes?",
  "Nice website, shame if something happened to it.",
  "I see you moving that mouse.",
  "You can’t stop me.",
  "Click the button, I dare you."
];

function spawnGoose() {
  const goose = document.createElement("img");
  goose.src = "/Images/Goose.png";
  goose.className = "goose";
  goose.style.left = Math.random() * document.documentElement.scrollWidth + "px";
  goose.style.top = Math.random() * document.documentElement.scrollHeight + "px";
  document.body.appendChild(goose);

  // Create a note bubble
  const note = document.createElement("div");
  note.className = "note";
  note.innerText = notes[Math.floor(Math.random() * notes.length)];
  document.body.appendChild(note);

  geese.push({ goose, note });

  animateGoose(goose, note);
}

function animateGoose(goose, note) {
  let x = parseFloat(goose.style.left) || 0;
  let y = parseFloat(goose.style.top) || 0;
  let targetX = Math.random() * (document.documentElement.scrollWidth - 100);
  let targetY = Math.random() * (document.documentElement.scrollHeight - 100);

  function step() {
    const dx = targetX - x;
    const dy = targetY - y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 2) {
      targetX = Math.random() * (document.documentElement.scrollWidth - 100);
      targetY = Math.random() * (document.documentElement.scrollHeight - 100);

      if (chaos && Math.random() < 0.3) {
        note.innerText = notes[Math.floor(Math.random() * notes.length)];
      }
      if (chaos && Math.random() < 0.2) honk.play();
    } else {
      const speed = 2;
      x += (dx / dist) * speed;
      y += (dy / dist) * speed;
      goose.style.left = x + "px";
      goose.style.top = y + "px";

      goose.style.transform = `rotate(${Math.sin(x / 20) * 10}deg)`;

      if (chaos && Math.random() < 0.01) leaveFootprint(x, y);
    }

    // Keep note following goose
    note.style.left = (x + 40) + "px";
    note.style.top = (y - 30) + "px";

    requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

function leaveFootprint(x, y) {
  const fp = document.createElement("div");
  fp.className = "footprint";
  fp.style.left = (x + 30) + "px";
  fp.style.top = (y + 60) + "px";
  document.body.appendChild(fp);
  setTimeout(() => fp.remove(), 4000);
}

function dropMeme(x, y) {
  const meme = document.createElement("img");
  meme.className = "meme";
  meme.src = memes[Math.floor(Math.random() * memes.length)];
  meme.style.left = (x + 50) + "px";
  meme.style.top = (y + 50) + "px";
  document.body.appendChild(meme);
  setTimeout(() => meme.remove(), 8000);
}

// Cursor stealing (desktop)
document.addEventListener("mousemove", e => {
  if (chaos && Math.random() < 0.002 && geese.length > 0) {
    const { goose } = geese[0];
    goose.style.left = e.pageX + "px";
    goose.style.top = e.pageY + "px";
    honk.play();
  }
});

// Cursor stealing (mobile)
document.addEventListener("touchmove", e => {
  if (chaos && Math.random() < 0.01 && geese.length > 0) {
    const touch = e.touches[0];
    const { goose } = geese[0];
    goose.style.left = touch.pageX + "px";
    goose.style.top = touch.pageY + "px";
    honk.play();
  }
});

// Toggle chaos mode
toggle.addEventListener("click", () => {
  chaos = !chaos;
  toggle.innerText = chaos ? "Banish Goose" : "Unleash Goose";

  if (chaos && geese.length === 0) {
    spawnGoose();
  } else if (!chaos) {
    geese.forEach(({ goose, note }) => {
      goose.remove();
      note.remove();
    });
    geese = [];
  }
});

// Rage mode (press R)
document.addEventListener("keydown", e => {
  if (e.key.toLowerCase() === "r" && chaos && geese.length > 0) {
    honk.play();
    // Reposition goose randomly
    const { goose } = geese[0];
    goose.style.left = Math.random() * document.documentElement.scrollWidth + "px";
    goose.style.top = Math.random() * document.documentElement.scrollHeight + "px";
  }
});