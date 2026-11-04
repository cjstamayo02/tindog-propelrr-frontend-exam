const $ = (s) => document.querySelector(s);
const header = $(".site-header"),
  burger = $(".burger"),
  nav = $("#nav");

// sticky header: solid background after scrolling
const onScroll = () => header.classList.toggle("scrolled", scrollY > 40);
addEventListener("scroll", onScroll, { passive: true });
onScroll();

// hamburger menu
const toggle = (open) => {
  nav.classList.toggle("open", open);
  burger.setAttribute("aria-expanded", open);
};
burger.onclick = () => toggle(!nav.classList.contains("open"));
nav.onclick = (e) => e.target.closest("a") && toggle(false);

// testimonial carousel: dots are generated from however many <li> exist
const track = $(".track"),
  dots = $(".dots"),
  cards = [...track.children];
const step = () =>
  cards[0].offsetWidth + parseFloat(getComputedStyle(track).columnGap);
cards.forEach((_, i) => {
  const b = Object.assign(document.createElement("button"), { type: "button" });
  b.setAttribute("aria-label", `Show testimonial ${i + 1}`);
  b.onclick = () => track.scrollTo({ left: i * step(), behavior: "smooth" });
  dots.append(b);
});
const sync = () =>
  [...dots.children].forEach((b, i) =>
    b.classList.toggle(
      "on",
      i === Math.min(Math.round(track.scrollLeft / step()), cards.length - 1),
    ),
  );
track.addEventListener("scroll", sync, { passive: true });
sync();
setInterval(
  () =>
    !track.matches(":hover") &&
    track.scrollTo({
      left:
        track.scrollLeft + step() > track.scrollWidth - track.clientWidth
          ? 0
          : track.scrollLeft + step(),
      behavior: "smooth",
    }),
  5000,
);

// scroll-reveal micro-interaction
const io = new IntersectionObserver(
  (es) =>
    es.forEach(
      (e) =>
        e.isIntersecting &&
        (e.target.classList.add("in"), io.unobserve(e.target)),
    ),
  { threshold: 0.15 },
);
document
  .querySelectorAll(
    ".hero-copy, .hero-art, .partners li, .card, .cta-grid > *, .foot-grid > *",
  )
  .forEach((el) => {
    el.classList.add("reveal");
    io.observe(el);
  });
