document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card, .block, .section-card");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.style.opacity = "1";
          e.target.style.transform = "translateY(0)";
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.08 });
    cards.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(12px)";
      el.style.transition = "opacity .45s ease, transform .45s ease";
      io.observe(el);
    });
  }

  initGalleryLightbox();
});

function initGalleryLightbox() {
  const figures = Array.from(document.querySelectorAll(".gallery figure, .visual-story figure")).filter((fig) =>
    fig.querySelector("img")
  );
  if (!figures.length) return;

  const items = figures.map((fig) => {
    const img = fig.querySelector("img");
    const caption = (fig.querySelector("figcaption")?.textContent || img.alt || "").trim();
    fig.setAttribute("role", "button");
    fig.setAttribute("tabindex", "0");
    fig.setAttribute("aria-label", `放大查看：${caption || "圖片"}`);
    return { src: img.currentSrc || img.src, alt: img.alt || "", caption };
  });

  const root = document.createElement("div");
  root.className = "lightbox";
  root.setAttribute("role", "dialog");
  root.setAttribute("aria-modal", "true");
  root.setAttribute("aria-hidden", "true");
  root.innerHTML = `
    <button type="button" class="lightbox-nav lightbox-prev" aria-label="上一張">‹</button>
    <div class="lightbox-dialog">
      <button type="button" class="lightbox-close" aria-label="關閉">×</button>
      <img class="lightbox-img" alt="">
      <p class="lightbox-caption"></p>
    </div>
    <button type="button" class="lightbox-nav lightbox-next" aria-label="下一張">›</button>
  `;
  document.body.appendChild(root);

  const imgEl = root.querySelector(".lightbox-img");
  const captionEl = root.querySelector(".lightbox-caption");
  const btnClose = root.querySelector(".lightbox-close");
  const btnPrev = root.querySelector(".lightbox-prev");
  const btnNext = root.querySelector(".lightbox-next");
  let index = 0;
  let lastFocus = null;

  function render() {
    const item = items[index];
    imgEl.src = item.src;
    imgEl.alt = item.alt;
    captionEl.textContent = item.caption;
    btnPrev.disabled = items.length < 2;
    btnNext.disabled = items.length < 2;
  }

  function open(i) {
    index = i;
    lastFocus = document.activeElement;
    render();
    root.classList.add("is-open");
    root.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    btnClose.focus();
  }

  function close() {
    root.classList.remove("is-open");
    root.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    imgEl.removeAttribute("src");
    if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
  }

  function step(delta) {
    if (items.length < 2) return;
    index = (index + delta + items.length) % items.length;
    render();
  }

  figures.forEach((fig, i) => {
    fig.addEventListener("click", () => open(i));
    fig.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        open(i);
      }
    });
  });

  btnClose.addEventListener("click", close);
  btnPrev.addEventListener("click", () => step(-1));
  btnNext.addEventListener("click", () => step(1));
  root.addEventListener("click", (e) => {
    if (e.target === root) close();
  });
  document.addEventListener("keydown", (e) => {
    if (!root.classList.contains("is-open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });
}
