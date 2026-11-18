const $ = (selector) => document.querySelector(selector);

// Add a field of softly twinkling stars to the opening scene.
const starField = $("#stars");
for (let i = 0; i < 95; i++) {
  const star = document.createElement("span");
  star.className = "star";
  star.style.left = `${Math.random() * 100}%`;
  star.style.top = `${Math.random() * 100}%`;
  star.style.animationDelay = `${Math.random() * 3}s`;
  star.style.opacity = `${0.25 + Math.random() * 0.75}`;
  const size = 1 + Math.random() * 2.2;
  star.style.width = `${size}px`;
  star.style.height = `${size}px`;
  starField.appendChild(star);
}

// Smooth navigation between the four chapters.
document.querySelectorAll("[data-go]").forEach(button => {
  button.addEventListener("click", () => {
    const target = document.getElementById(button.dataset.go);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  });
});

// Envelope interaction.
$("#openLetter").addEventListener("click", () => {
  const envelope = $("#openLetter");
  const card = $("#letterCard");
  envelope.classList.add("open");
  card.classList.add("show");
  envelope.setAttribute("aria-expanded", "true");
  setTimeout(() => card.scrollIntoView({ behavior: "smooth", block: "center" }), 350);
});

// Each tap grows one flower. Tapping a bloomed flower does not remove it.
const flowers = [...document.querySelectorAll(".flower-spot")];
const notes = [
  "A wish for more reasons to smile. ♡",
  "A wish for kind people and warm moments. ♡",
  "A wish for dreams that come true. ♡",
  "A wish for little surprises and big happiness. ♡",
  "And a reminder that you are one of a kind. ♡"
];
function updateGarden() {
  const count = flowers.filter(f => f.classList.contains("bloomed")).length;
  $("#gardenCounter").textContent = `${count} / 5 flowers have bloomed`;
  if (count === 5) $("#gardenNote").textContent = "Your little garden is in full bloom. Keep shining, Princess! ♡";
}
flowers.forEach((flower, index) => {
  flower.addEventListener("click", () => {
    if (flower.classList.contains("bloomed")) return;
    flower.classList.add("bloomed");
    $("#gardenNote").textContent = notes[index];
    updateGarden();
  });
});

// Gift box opens to reveal the final note.
$("#giftBox").addEventListener("click", () => {
  const gift = $("#giftBox");
  if (gift.classList.contains("open")) return;
  gift.classList.add("open");
  $("#giftHint").textContent = "A LITTLE SURPRISE FOR YOU ♡";
  setTimeout(() => {
    $("#finalMessage").classList.add("show");
    $("#finalMessage").scrollIntoView({ behavior: "smooth", block: "center" });
  }, 650);
});

// Scroll progress indicator.
const progressBar = $("#progressBar");
function updateProgress() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const amount = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
  progressBar.style.width = `${amount}%`;
}
window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();
