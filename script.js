const SITE_CONFIG = {
  youtubeUrl: "https://youtu.be/i7s5aJ-T4ZY",
  githubUrl: "https://github.com/GemmaGuard/gemma-guard-android",
  kaggleWriteupUrl: "YOUR_KAGGLE_WRITEUP_URL",
};

function getYouTubeEmbedUrl(url) {
  if (!url || url.includes("YOUR_YOUTUBE_URL")) {
    return null;
  }

  try {
    const parsed = new URL(url);
    let videoId = "";

    if (parsed.hostname.includes("youtu.be")) {
      videoId = parsed.pathname.replace("/", "");
    } else if (parsed.searchParams.get("v")) {
      videoId = parsed.searchParams.get("v");
    } else if (parsed.pathname.includes("/embed/")) {
      videoId = parsed.pathname.split("/embed/")[1];
    }

    if (!videoId) {
      return null;
    }

    return `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`;
  } catch {
    return null;
  }
}

function applyExternalLinks() {
  const githubLinks = document.querySelectorAll("[data-github-link]");
  const kaggleLinks = document.querySelectorAll("[data-kaggle-link]");
  const isPlaceholder = !SITE_CONFIG.githubUrl || SITE_CONFIG.githubUrl.includes("YOUR_GITHUB_URL");
  const isKagglePlaceholder =
    !SITE_CONFIG.kaggleWriteupUrl ||
    SITE_CONFIG.kaggleWriteupUrl.includes("YOUR_KAGGLE_WRITEUP_URL");

  githubLinks.forEach((link) => {
    if (isPlaceholder) {
      link.removeAttribute("href");
      link.setAttribute("aria-disabled", "true");
      link.classList.add("is-disabled");
      link.title = "Replace YOUR_GITHUB_URL in script.js";
      return;
    }

    link.setAttribute("href", SITE_CONFIG.githubUrl);
  });

  kaggleLinks.forEach((link) => {
    if (isKagglePlaceholder) {
      link.removeAttribute("href");
      link.setAttribute("aria-disabled", "true");
      link.classList.add("is-disabled");
      link.title = "Replace YOUR_KAGGLE_WRITEUP_URL in script.js";
      return;
    }

    link.setAttribute("href", SITE_CONFIG.kaggleWriteupUrl);
  });
}

function applyVideoEmbed() {
  const iframe = document.querySelector("[data-video-iframe]");
  const placeholder = document.querySelector("[data-video-placeholder]");
  const embedUrl = getYouTubeEmbedUrl(SITE_CONFIG.youtubeUrl);

  if (!iframe || !placeholder || !embedUrl) {
    return;
  }

  iframe.src = embedUrl;
  iframe.hidden = false;
  placeholder.hidden = true;
}

function setupMobileMenu() {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector("[data-menu-toggle]");
  const nav = document.querySelector("[data-site-nav]");

  if (!header || !toggle || !nav) {
    return;
  }

  const closeMenu = () => {
    header.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  };

  toggle.addEventListener("click", () => {
    const nextState = !header.classList.contains("is-open");
    header.classList.toggle("is-open", nextState);
    toggle.setAttribute("aria-expanded", String(nextState));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 840) {
      closeMenu();
    }
  });
}

function applyCurrentYear() {
  const currentYear = document.getElementById("current-year");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }
}

function setupScreenshotGalleryMotion() {
  const gallery = document.querySelector("[data-gallery]");
  const strip = document.querySelector("[data-gallery-strip]");

  if (!gallery || !strip || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  let frameId = null;
  let direction = 1;
  let pausedUntil = 0;
  let resumeTimeout = null;

  const updateStripState = () => {
    const maxScroll = gallery.scrollWidth - gallery.clientWidth;
    const overflowing = maxScroll > 8;
    const leftVisible = gallery.scrollLeft > 6;
    const rightVisible = gallery.scrollLeft < maxScroll - 6;

    strip.classList.toggle("is-overflowing", overflowing);
    strip.classList.toggle("show-left", overflowing && leftVisible);
    strip.classList.toggle("show-right", overflowing && rightVisible);
  };

  const stop = () => {
    if (frameId) {
      cancelAnimationFrame(frameId);
      frameId = null;
    }
  };

  const tick = () => {
    const maxScroll = gallery.scrollWidth - gallery.clientWidth;

    updateStripState();

    if (maxScroll <= 8) {
      stop();
      gallery.scrollLeft = 0;
      updateStripState();
      return;
    }

    const now = performance.now();

    if (now < pausedUntil) {
      frameId = requestAnimationFrame(tick);
      return;
    }

    const next = gallery.scrollLeft + 0.28 * direction;
    const clampMax = maxScroll;

    if (next >= clampMax) {
      direction = -1;
      pausedUntil = now + 900;
      gallery.scrollLeft = clampMax;
    } else if (next <= 0) {
      direction = 1;
      pausedUntil = now + 900;
      gallery.scrollLeft = 0;
    } else {
      gallery.scrollLeft = next;
    }

    frameId = requestAnimationFrame(tick);
  };

  const resume = () => {
    if (resumeTimeout) {
      clearTimeout(resumeTimeout);
      resumeTimeout = null;
    }

    stop();
    pausedUntil = performance.now() + 1200;
    updateStripState();
    frameId = requestAnimationFrame(tick);
  };

  ["pointerdown", "touchstart", "wheel"].forEach((eventName) => {
    gallery.addEventListener(eventName, () => {
      pausedUntil = performance.now() + 2500;
    }, { passive: true });
  });

  gallery.addEventListener("scroll", updateStripState, { passive: true });
  window.addEventListener("resize", resume);
  updateStripState();
  resume();
}

applyExternalLinks();
applyVideoEmbed();
setupMobileMenu();
applyCurrentYear();
setupScreenshotGalleryMotion();
