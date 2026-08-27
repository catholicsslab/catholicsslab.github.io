const pages = [
  ["about", "About", "about.html"],
  ["research", "Research", "research.html"],
  ["people", "People", "people.html"],
  ["publications", "Publications", "publications.html"],
  ["join", "Join Us", "join.html"],
  ["contact", "Contact", "contact.html"],
];

const currentPage = document.body.dataset.page || "home";
const headerMount = document.querySelector("#site-header-mount");
const footerMount = document.querySelector("#site-footer-mount");

function currentAttribute(page) {
  return currentPage === page ? ' aria-current="page"' : "";
}

if (headerMount) {
  const desktopLinks = pages
    .map(
      ([page, label, href]) =>
        `<a class="nav-link" href="./${href}"${currentAttribute(page)}>${label}</a>`,
    )
    .join("");
  const mobileLinks = pages
    .map(
      ([page, label, href]) =>
        `<a class="mobile-nav-link" href="./${href}"${currentAttribute(page)}>${label}</a>`,
    )
    .join("");

  headerMount.innerHTML = `
    <a class="skip-link" href="#main-content">본문으로 바로가기</a>
    <header class="site-header" id="site-header">
      <div class="header-inner">
        <a class="brand-link" href="./index.html" aria-label="SS Lab Translational Genomics Laboratory 홈">
          <img class="brand-mark" src="./logo-mark.svg" alt="" />
          <span>
            <span class="brand-name"><span class="brand-name-accent">SS</span> Lab</span>
            <span class="brand-subtitle">Translational Genomics Laboratory</span>
          </span>
        </a>
        <nav class="desktop-nav" aria-label="주요 메뉴">
          ${desktopLinks}
        </nav>
        <a class="header-cta" href="./join.html">
          대학원생 모집
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </a>
        <button class="menu-button" id="menu-button" type="button" aria-expanded="false" aria-controls="mobile-menu" aria-label="메뉴 열기">
          <svg id="menu-open-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
          <svg id="menu-close-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true" style="display:none"><path d="m5 5 10 10M15 5 5 15" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
        </button>
      </div>
      <nav class="mobile-menu" id="mobile-menu" aria-label="모바일 메뉴">
        ${mobileLinks}
      </nav>
    </header>`;

  const menuButton = document.querySelector("#menu-button");
  const mobileMenu = document.querySelector("#mobile-menu");
  const openIcon = document.querySelector("#menu-open-icon");
  const closeIcon = document.querySelector("#menu-close-icon");
  const siteHeader = document.querySelector("#site-header");

  function setMenu(open) {
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "메뉴 닫기" : "메뉴 열기");
    mobileMenu.classList.toggle("is-open", open);
    openIcon.style.display = open ? "none" : "block";
    closeIcon.style.display = open ? "block" : "none";
  }

  menuButton.addEventListener("click", () => {
    setMenu(menuButton.getAttribute("aria-expanded") !== "true");
  });
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenu(false);
  });
  window.addEventListener(
    "scroll",
    () => siteHeader.classList.toggle("is-scrolled", window.scrollY > 8),
    { passive: true },
  );
}

if (footerMount) {
  footerMount.innerHTML = `
    <footer class="site-footer">
      <div class="footer-inner">
        <a class="brand-link" href="./index.html" aria-label="SS Lab Translational Genomics Laboratory 홈">
          <img class="brand-mark" src="./logo-mark.svg" alt="" />
          <span>
            <span class="brand-name"><span class="brand-name-accent">SS</span> Lab</span>
            <span class="brand-subtitle">Translational Genomics Laboratory</span>
          </span>
        </a>
        <p class="footer-copy">© ${new Date().getFullYear()} SS Lab · 질병유전체연구실.<br />Translational Genomics Laboratory · The Catholic University of Korea.</p>
      </div>
    </footer>`;
}
