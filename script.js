const socialLinks = [
  {
    label: "GitHub",
    url: "https://github.com/Jmae-Eng",
    icon: '<path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.11.79-.25.79-.56v-2.2c-3.23.7-3.91-1.56-3.91-1.56-.52-1.34-1.26-1.7-1.26-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.58-.29-5.3-1.29-5.3-5.74 0-1.27.45-2.31 1.2-3.12-.12-.3-.52-1.48.11-3.08 0 0 .98-.31 3.18 1.19A11.1 11.1 0 0 1 12 5.96c.99 0 1.98.13 2.91.4 2.2-1.5 3.18-1.19 3.18-1.19.63 1.6.23 2.78.11 3.08.75.81 1.2 1.85 1.2 3.12 0 4.46-2.72 5.45-5.31 5.73.42.36.78 1.08.78 2.18v3.23c0 .31.21.68.8.56A11.5 11.5 0 0 0 12 .5Z"/>',
  },
  {
    label: "LinkedIn",
    url: "#",
    icon: '<path d="M5.34 7.43a2.07 2.07 0 1 0 0-4.14 2.07 2.07 0 0 0 0 4.14ZM3.56 20.5h3.56V9H3.56v11.5ZM9.34 9h3.41v1.57h.05c.47-.9 1.64-1.84 3.37-1.84 3.6 0 4.27 2.37 4.27 5.45v6.32h-3.55v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7H9.34V9Z"/>',
  },
  {
    label: "Instagram",
    url: "https://www.instagram.com/peltenpen/",
    icon: '<path fill-rule="evenodd" d="M7.2 2.5h9.6A4.7 4.7 0 0 1 21.5 7.2v9.6a4.7 4.7 0 0 1-4.7 4.7H7.2a4.7 4.7 0 0 1-4.7-4.7V7.2a4.7 4.7 0 0 1 4.7-4.7Zm0 2.5A2.2 2.2 0 0 0 5 7.2v9.6A2.2 2.2 0 0 0 7.2 19h9.6a2.2 2.2 0 0 0 2.2-2.2V7.2A2.2 2.2 0 0 0 16.8 5H7.2ZM12 7.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Zm0 2.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm5.25-3.75a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z" clip-rule="evenodd"/>',
  },
  // Add another object here to show a new social icon in the row.
];

const isOwner = true;

const socialRow = document.querySelector("#social-row");

socialLinks.forEach(({ label, url, icon }) => {
  const link = document.createElement("a");
  link.href = url;
  link.className = "social-btn";
  link.setAttribute("aria-label", label);
  link.innerHTML = `<svg class="brand-logo" viewBox="0 0 24 24" aria-hidden="true">${icon}</svg>`;
  socialRow.appendChild(link);
});

const themeToggle = document.querySelector("#theme-toggle");
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light" || savedTheme === "dark") {
  document.documentElement.classList.add(`${savedTheme}-mode`);
}

function updateThemeToggle() {
  const isDark = document.documentElement.classList.contains("dark-mode");
  const nextTheme = isDark ? "light" : "dark";
  const icon = isDark
    ? '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>'
    : '<path d="M21 12.8A8.5 8.5 0 1 1 11.2 3 6.6 6.6 0 0 0 21 12.8Z"/>';

  themeToggle.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true">${icon}</svg>`;
  themeToggle.setAttribute("aria-label", `Switch to ${nextTheme} mode`);
  themeToggle.title = `Switch to ${nextTheme} mode`;
}

themeToggle.addEventListener("click", () => {
  const isDark = document.documentElement.classList.contains("dark-mode");
  const nextTheme = isDark ? "light" : "dark";

  document.documentElement.classList.remove("light-mode", "dark-mode");
  document.documentElement.classList.add(`${nextTheme}-mode`);
  localStorage.setItem("theme", nextTheme);
  updateThemeToggle();
});

updateThemeToggle();

const scrollMap = document.querySelector("#scroll-map");
const scrollProgress = document.querySelector("#scroll-progress");
const mapPoints = [...document.querySelectorAll(".map-point")];
const mapSections = mapPoints.map((point) => document.querySelector(`#${point.dataset.section}`));
const workMapPoint = document.querySelector(".work-map-point");

function updateScrollMap() {
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollAmount = window.scrollY;
  const scrollPercent = scrollableHeight > 0 ? scrollAmount / scrollableHeight : 0;
  const currentSection = mapSections.reduce((activeSection, section) => {
    const bounds = section.getBoundingClientRect();
    const visibleHeight = Math.max(
      0,
      Math.min(bounds.bottom, window.innerHeight) - Math.max(bounds.top, 0),
    );
    const activeBounds = activeSection.getBoundingClientRect();
    const activeVisibleHeight = Math.max(
      0,
      Math.min(activeBounds.bottom, window.innerHeight) - Math.max(activeBounds.top, 0),
    );

    return visibleHeight > activeVisibleHeight ? section : activeSection;
  }, mapSections[0]);

  scrollMap.classList.toggle("is-visible", scrollAmount > 80);
  scrollProgress.style.transform = `scaleY(${Math.min(scrollPercent, 1)})`;
  mapPoints.forEach((point) => {
    const isActive = point.dataset.section === currentSection.id;
    point.classList.toggle("is-active", isActive);
    if (isActive) {
      point.setAttribute("aria-current", "location");
    } else {
      point.removeAttribute("aria-current");
    }
  });
}

window.addEventListener("scroll", updateScrollMap, { passive: true });
window.addEventListener("resize", updateScrollMap);
updateScrollMap();

const galleryItems = [
  {
    id: "solitaire",
    htmlFile: "Website Core/Project Blogs/Coding/CoePro03/solitaire.html",
    projectCategory: "coding",
    title: "Solitaire",
    shortTitle: "Solitaire",
    date: "2026",
    category: "Coding project",
    summary: "This is a group project we made in 2nd Year, 3rd Semester in ICCT as BSCOE.",
    role: "UI and Control Dev",
    process: "Learning JavaScript with the help of other members of my group.",
    image: "Website Core/Images and Videos/CoePro03/coepeo3.PNG",
  },
  {
    id: "cirno-decollege",
    htmlFile: "Website Core/Project Blogs/Random Projects/Cirno Decolleges/cirno-decollege.html",
    projectCategory: "random",
    title: "Cirno Decollege",
    shortTitle: "Cirno Decollege",
    date: "2023",
    category: "Random project",
    summary: "Open the project page for the full concept write-up.",
    role: "See the project page for the detailed breakdown.",
    process: "See the project page for the detailed breakdown.",
    image: "Website Core/Images and Videos/Random/Art 1/F1liuLgaYAcBrdk.jfif",
    bannerImage: "https://drive.google.com/uc?export=view&id=1bWvFPmL95dPPxhdRG0uXNU6WXO8PmPot",
  },
];

try {
  const savedGalleryItems = JSON.parse(localStorage.getItem("galleryItems") || "{}");
  galleryItems.forEach((work) => Object.assign(work, savedGalleryItems[work.id] || {}));
} catch {
  localStorage.removeItem("galleryItems");
}

const galleryGrid = document.querySelector("#gallery-grid");
const categoryTabs = document.querySelector("#category-tabs");
const workDetail = document.querySelector("#work-detail");
const createWorkButton = document.querySelector("#create-work-button");
const createWorkForm = document.querySelector("#create-work-form");
const imageModal = document.querySelector("#image-modal");
const modalImage = document.querySelector("#modal-image");
const modalCaption = document.querySelector("#modal-caption");
const closeModal = document.querySelector("#close-modal");
function renderWorkDetail(work) {
  const bannerImage = work.bannerImage || work.image;

  workDetail.innerHTML = `
    <div class="work-detail-hero">
      <button class="back-to-gallery" type="button">&larr; Back to my works</button>
      <img src="${bannerImage}" alt="${work.shortTitle}" />
    </div>
    <div class="work-detail-copy">
      <p class="readme-label">Selected work / ${work.category}</p>
      <h2>${escapeHtml(work.shortTitle)}</h2>
      <p class="work-intro">${escapeHtml(work.summary)}</p>
      <div class="work-meta">
        <span><strong>Year</strong>${escapeHtml(work.date)}</span>
        <span><strong>Focus</strong>${escapeHtml(work.category)}</span>
        <button class="view-work-image" type="button">View image</button>
        ${isOwner ? '<button class="edit-work" type="button">Edit project</button>' : ""}
      </div>
      <a class="open-work-page" href="${escapeHtml(work.htmlFile)}" target="_blank" rel="noopener noreferrer">Open full work page</a>
      <form class="work-editor" hidden>
        <div class="editor-heading"><strong>Edit this project</strong><button class="cancel-edit" type="button">Cancel</button></div>
        <label>Card title<input name="title" value="${escapeHtml(work.title)}" required></label>
        <label>Project title<input name="shortTitle" value="${escapeHtml(work.shortTitle)}" required></label>
        <div class="editor-row"><label>Year<input name="date" value="${escapeHtml(work.date)}" required></label><label>Category<input name="category" value="${escapeHtml(work.category)}" required></label></div>
        <label>Summary<textarea name="summary" rows="3" required>${escapeHtml(work.summary)}</textarea></label>
        <label>My role<textarea name="role" rows="3" required>${escapeHtml(work.role)}</textarea></label>
        <label>How I made it<textarea name="process" rows="5" required>${escapeHtml(work.process)}</textarea></label>
        <label>Card image path or URL<input name="image" value="${escapeHtml(work.image)}" placeholder="Work Image and Video/work-2.jpg" required></label>
        <label>Banner image path or URL<input name="bannerImage" value="${escapeHtml(work.bannerImage || work.image)}" placeholder="Work Image and Video/work-banner.jpg"></label>
        <label>More image paths or URLs<textarea name="extraImages" rows="3" placeholder="One path or URL per line">${escapeHtml((work.extraImages || []).join("\n"))}</textarea></label>
        <label>Video path or URL<input name="video" value="${escapeHtml(work.video || "")}" placeholder="Work Image and Video/work-1.mp4"></label>
        <button class="save-work" type="submit">Save changes</button>
      </form>
      <div class="work-story">
        <aside class="work-contents">
          <strong>Contents</strong>
          <a href="#work-role">My role</a>
          <a href="#work-process">How I made it</a>
        </aside>
        <div class="work-article">
          <h3 id="work-role">My role</h3>
          <p>${escapeHtml(work.role)}</p>
          <h3 id="work-process">How I made it</h3>
          <p>${escapeHtml(work.process)}</p>
        </div>
      </div>
      ${work.extraImages?.length || work.video ? `<div class="work-media"><h3>Project media</h3>${(work.extraImages || []).map((image) => `<img src="${escapeHtml(image)}" alt="Additional project image" loading="lazy">`).join("")}${work.video ? `<video src="${escapeHtml(work.video)}" controls preload="metadata"></video>` : ""}</div>` : ""}
    </div>`;

  workDetail.hidden = false;
  workMapPoint.hidden = false;
  workDetail.querySelector(".back-to-gallery").addEventListener("click", closeWorkDetail);
  const editButton = workDetail.querySelector(".edit-work");
  const editor = workDetail.querySelector(".work-editor");
  if (editButton) editButton.addEventListener("click", () => {
    editor.hidden = false;
    editor.querySelector("input").focus();
  });
  if (editor) editor.querySelector(".cancel-edit").addEventListener("click", () => {
    editor.hidden = true;
  });
  if (editor) editor.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    ["title", "shortTitle", "date", "category", "summary", "role", "process"].forEach((field) => {
      work[field] = formData.get(field).trim();
    });
    work.image = formData.get("image").trim();
    work.bannerImage = (formData.get("bannerImage") || formData.get("image")).trim();
    work.extraImages = formData.get("extraImages").split("\n").map((path) => path.trim()).filter(Boolean);
    work.video = formData.get("video").trim();
    const savedItems = JSON.parse(localStorage.getItem("galleryItems") || "{}");
    savedItems[work.id] = work;
    localStorage.setItem("galleryItems", JSON.stringify(savedItems));
    const card = galleryGrid.querySelector(`[data-work-id="${work.id}"]`);
    card.querySelector("img").alt = work.title;
    card.querySelector("span").textContent = work.title;
    renderWorkDetail(work);
  });
  workDetail.querySelector(".view-work-image").addEventListener("click", () => {
    modalImage.src = work.bannerImage || work.image;
    modalImage.alt = work.shortTitle;
    modalCaption.textContent = work.shortTitle;
    imageModal.showModal();
  });
  workDetail.scrollIntoView({ behavior: "auto", block: "start" });
  requestAnimationFrame(() => requestAnimationFrame(updateScrollMap));
}

function closeWorkDetail() {
  workDetail.hidden = true;
  workMapPoint.hidden = true;
  history.pushState({}, "", "#gallery");
  document.querySelector("#gallery").scrollIntoView({ behavior: "auto", block: "start" });
  requestAnimationFrame(() => requestAnimationFrame(updateScrollMap));
}

function renderCreateForm() {
  createWorkForm.innerHTML = `
    <div class="editor-heading"><strong>Create a new work</strong><button class="cancel-create" type="button">Cancel</button></div>
    <label>Card title<input name="title" placeholder="My new project" required></label>
    <label>Project title<input name="shortTitle" placeholder="Project title" required></label>
    <div class="editor-row"><label>Category<select name="category"><option value="coding">Coding</option><option value="electronic">Electronic</option><option value="random">Random projects</option></select></label><label>Year<input name="date" value="2026" required></label></div>
    <label>Summary<textarea name="summary" rows="3" required></textarea></label>
    <fieldset class="create-contents-editor"><legend>Contents sections</legend><div class="new-sections-list"></div><button class="add-new-section" type="button">Add section</button></fieldset>
    <label>Card image path or URL<input name="image" placeholder="Work Image and Video/work-thumb.jpg" required></label>
    <label>Banner image only (path or URL)<input name="bannerImage" placeholder="Work Image and Video/work-banner.jpg"></label>
    <label>More image paths or URLs<textarea name="extraImages" rows="3" placeholder="One path or URL per line"></textarea></label>
    <label>Additional images placement<select name="extraImagePlacement"><option value="top">Top</option><option value="middle" selected>Middle</option><option value="bottom">Bottom</option></select></label>
    <label>Video path or URL<input name="video" placeholder="Work Image and Video/work-new.mp4"></label>
    <button class="save-work" type="submit">Create work</button>`;
  createWorkForm.hidden = false;
  createWorkForm.querySelector(".cancel-create").addEventListener("click", () => { createWorkForm.hidden = true; });
  const sectionsList = createWorkForm.querySelector(".new-sections-list");
  const addSection = (title = "", text = "") => {
    const row = document.createElement("div");
    row.className = "new-section-row";
    row.innerHTML = `<input name="sectionTitle" placeholder="Section title" value="${escapeHtml(title)}" required><textarea name="sectionText" rows="3" placeholder="Section content">${escapeHtml(text)}</textarea><input name="sectionImage" placeholder="Section image path or URL"><input name="sectionVideo" placeholder="Section video path or URL"><button class="remove-new-section" type="button">Remove</button>`;
    row.querySelector(".remove-new-section").addEventListener("click", () => row.remove());
    sectionsList.appendChild(row);
  };
  addSection("My role", "");
  addSection("How I made it", "");
  createWorkForm.querySelector(".add-new-section").addEventListener("click", () => addSection());
}

createWorkButton.addEventListener("click", renderCreateForm);
createWorkForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const work = {
    id: `${formData.get("shortTitle").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-")}-${Date.now()}`,
    htmlFile: `Work Html/${formData.get("shortTitle").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-")}.html`,
    title: formData.get("title").trim(),
    shortTitle: formData.get("shortTitle").trim(),
    date: formData.get("date").trim(),
    category: formData.get("category"),
    projectCategory: formData.get("category"),
    summary: formData.get("summary").trim(),
    role: "",
    process: "",
    extraImages: [],
  };
  work.image = formData.get("image").trim();
  work.bannerImage = (formData.get("bannerImage") || formData.get("image")).trim();
  work.extraImages = (formData.get("extraImages") || "").split("\n").map((path) => path.trim()).filter(Boolean);
  work.extraImagePlacement = formData.get("extraImagePlacement");
  work.sections = [...event.currentTarget.querySelectorAll(".new-section-row")].map((row) => ({
    title: row.querySelector('[name="sectionTitle"]').value.trim(),
    text: row.querySelector('[name="sectionText"]').value.trim(),
    image: row.querySelector('[name="sectionImage"]').value.trim(),
    video: row.querySelector('[name="sectionVideo"]').value.trim(),
  })).filter((section) => section.title);
  work.role = work.sections[0]?.text || "";
  work.process = work.sections[1]?.text || "";
  work.video = (formData.get("video") || "").trim();
  work.source = "created";
  galleryItems.push(work);
  downloadWorkHtml(work);
  createWorkForm.hidden = true;
  renderGallery(work.category);
});

function downloadWorkHtml(work) {
  const media = (work.extraImages || []).map((image) => {
    const imageSource = getProjectAssetPath(image);
    return `<figure class="project-extra-item"><a href="${escapeHtml(imageSource)}" target="_blank" rel="noreferrer"><img src="${escapeHtml(imageSource)}" alt="Additional project image" loading="lazy" decoding="async"></a></figure>`;
  }).join("");
  const video = work.video ? `<video src="${escapeHtml(getProjectAssetPath(work.video))}" controls preload="metadata"></video>` : "";
  const bannerImage = getProjectAssetPath(work.bannerImage || work.image);
  const placement = ["top", "middle", "bottom"].includes(work.extraImagePlacement) ? work.extraImagePlacement : "middle";
  const sections = getProjectSections(work);
  const contentsLinks = sections.map((section) => `<a href="#${section.id}">${escapeHtml(section.title)}</a>`).join("");
  const contentSections = sections.map((section, index) => {
    const sectionImage = section.image ? `<img src="${escapeHtml(getProjectAssetPath(section.image))}" alt="${escapeHtml(section.title)} image" loading="lazy">` : "";
    const sectionVideo = section.video ? `<video src="${escapeHtml(getProjectAssetPath(section.video))}" controls preload="metadata"></video>` : "";
    const sectionMedia = sectionImage || sectionVideo ? `<div class="section-media">${sectionImage}${sectionVideo}</div>` : "";
    return `<h2 id="${section.id}">${escapeHtml(section.title)}</h2><p>${escapeHtml(section.text)}</p>${sectionMedia}${placement === "middle" && index === 0 ? `<section class="project-extra-gallery" aria-label="Project gallery">${media}${video}</section>` : ""}`;
  }).join("");
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(work.shortTitle)}</title>
  <link rel="stylesheet" href="../style.css">
  <style>
    .standalone-work { width: min(1260px, calc(100vw - 120px)); max-width: 100%; margin: 0 auto; }
    .standalone-hero { position: relative; display: flex; flex-direction: column; background: #121821; }
    .standalone-hero img { display: block; width: min(100%, 1000px); height: auto; max-height: min(78vh, 900px); margin: 0 auto; object-fit: contain; }
    .standalone-hero-copy { padding: 20px 28px 0; }
    .standalone-hero-copy h1 { margin: 10px 0 16px; text-align: left; }
    .project-extra-gallery { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 18px; width: min(980px, 100%); margin: 12px auto 0; padding: 0 28px 24px; }
    .project-extra-item { overflow: hidden; border: 1px solid rgba(255,255,255,.12); border-radius: 16px; background: rgba(255,255,255,.03); }
    .project-extra-item img { display: block; width: 100%; height: auto; max-height: 760px; object-fit: contain; background: #121821; }
    .standalone-article { padding: 0 28px 32px; }
    .standalone-meta, .standalone-story { width: min(980px, 100%); margin: 0 auto; }
    .standalone-story { display: grid; grid-template-columns: 220px minmax(0, 1fr); gap: 52px; padding-top: 30px; }
    .standalone-story article { min-width: 0; }
    .project-extra-gallery video { width: 100%; max-height: 760px; }
    @media (max-width: 640px) { .standalone-work { width: 100%; } .standalone-story { grid-template-columns: 1fr; gap: 24px; } }
  </style>
</head>
<body class="work-page">
  <main class="standalone-work" data-extra-image-placement="${placement}">
    <section class="standalone-hero">
      <a class="standalone-back" href="../index.html#gallery">&larr; Back to my works</a>
      <img src="${escapeHtml(bannerImage)}" alt="${escapeHtml(work.shortTitle)} artwork">
      <div class="standalone-hero-copy">
        <p class="readme-label">Selected work / ${escapeHtml(work.category)}</p>
        <h1>${escapeHtml(work.shortTitle)}</h1>
        <p>${escapeHtml(work.summary)}</p>
      </div>
    </section>
    <section class="standalone-article">
      <div class="standalone-meta"><span><strong>Year</strong>${escapeHtml(work.date)}</span><span><strong>Focus</strong>${escapeHtml(work.category)}</span></div>
      ${placement === "top" ? `<section class="project-extra-gallery" aria-label="Project gallery">${media}${video}</section>` : ""}
      <div class="standalone-story">
        <aside class="standalone-contents"><strong>Contents</strong>${contentsLinks}</aside>
        <article>
          ${contentSections}
        </article>
      </div>
      ${placement === "bottom" ? `<section class="project-extra-gallery" aria-label="Project gallery">${media}${video}</section>` : ""}
    </section>
  </main>
</body>
</html>`;
  const link = document.createElement("a");
  const downloadUrl = URL.createObjectURL(new Blob([html], { type: "text/html;charset=utf-8" }));
  link.href = downloadUrl;
  link.download = work.htmlFile.split("/").pop();
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(downloadUrl);
}

function getProjectAssetPath(assetPath) {
  const value = normalizeProjectImageUrl(assetPath);
  if (/^(https?:|data:|blob:|\/)/i.test(value)) return value;
  return `../${value}`;
}

function normalizeProjectImageUrl(assetPath) {
  const value = String(assetPath || "").trim();
  const driveMatch = value.match(/drive\.google\.com\/file\/d\/([^/]+)/i);
  return driveMatch ? `https://drive.google.com/uc?export=view&id=${driveMatch[1]}` : value;
}

function getProjectSections(work) {
  const sections = Array.isArray(work.sections) && work.sections.length
    ? work.sections
    : [{ title: "My role", text: work.role }, { title: "How I made it", text: work.process }];
  return sections.filter((section) => section.title).map((section, index) => ({
    id: `${section.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "section"}-${index}`,
    title: section.title,
    text: section.text || "",
    image: section.image || "",
    video: section.video || "",
  }));
}

const projectCategories = [
  { id: "coding", label: "Coding", description: "Websites, apps, and software projects" },
  { id: "electronic", label: "Electronic", description: "Hardware and electronics projects" },
  { id: "random", label: "Random projects", description: "Experiments and everything in between" },
];

const placeholders = {
  coding: "Coding projects will be added here soon.",
  electronic: "Electronics projects will be added here soon.",
  random: "Random projects will be added here soon.",
};

function renderGallery(categoryId) {
  galleryGrid.innerHTML = "";
  const works = galleryItems.filter((work) => work.projectCategory === categoryId);

  if (!works.length) {
    galleryGrid.innerHTML = `<div class="category-placeholder"><span>Coming soon</span><strong>${placeholders[categoryId]}</strong><p>This space is ready for a new project.</p></div>`;
    return;
  }

  works.forEach((work) => {
    const { title, image } = work;
    const item = document.createElement("button");
    item.className = "gallery-item";
    item.type = "button";
    item.dataset.workId = work.id;
    item.innerHTML = `<img src="${image}" alt="${title}" loading="lazy"><span>${title}</span>`;
    item.addEventListener("click", () => {
      window.location.href = work.htmlFile;
    });
    galleryGrid.appendChild(item);
  });
}

projectCategories.forEach((category, index) => {
  const tab = document.createElement("button");
  tab.className = "category-tab";
  tab.type = "button";
  tab.role = "tab";
  tab.textContent = category.label;
  tab.setAttribute("aria-selected", index === 0 ? "true" : "false");
  tab.addEventListener("click", () => {
    document.querySelectorAll(".category-tab").forEach((button) => button.setAttribute("aria-selected", "false"));
    tab.setAttribute("aria-selected", "true");
    renderGallery(category.id);
  });
  categoryTabs.appendChild(tab);
});

renderGallery("coding");

closeModal.addEventListener("click", () => imageModal.close());
imageModal.addEventListener("click", (event) => {
  if (event.target === imageModal) imageModal.close();
});

const readmeContent = document.querySelector("#readme-content");
const readmeTitle = document.querySelector("#readme-title");

function escapeHtml(value) {
  return value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[character]);
}

function formatInlineMarkdown(value) {
  let formatted = escapeHtml(value);

  formatted = formatted.replace(
    /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>',
  );
  formatted = formatted.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  formatted = formatted.replace(/`([^`]+)`/g, "<code>$1</code>");

  return formatted;
}

function renderReadme(markdown) {
  const cleanMarkdown = markdown.replace(/<!--[\s\S]*?-->/g, "");
  const lines = cleanMarkdown.split("\n");
  const rendered = [];
  let paragraph = [];
  let listItems = [];

  const flushParagraph = () => {
    if (paragraph.length) {
      rendered.push(`<p>${paragraph.join(" ")}</p>`);
      paragraph = [];
    }
  };

  const flushList = () => {
    if (listItems.length) {
      rendered.push(`<ul>${listItems.map((item) => `<li>${item}</li>`).join("")}</ul>`);
      listItems = [];
    }
  };

  lines.forEach((line) => {
    const trimmedLine = line.trim();

    if (!trimmedLine) {
      flushParagraph();
      flushList();
      return;
    }

    if (trimmedLine.startsWith("#")) {
      flushParagraph();
      flushList();
      const heading = trimmedLine.match(/^(#{1,6})\s+(.+)$/);
      if (heading) {
        const level = Math.min(heading[1].length + 1, 6);
        rendered.push(`<h${level}>${formatInlineMarkdown(heading[2])}</h${level}>`);
      }
      return;
    }

    if (trimmedLine.startsWith("- ") || trimmedLine.startsWith("* ")) {
      flushParagraph();
      listItems.push(formatInlineMarkdown(trimmedLine.slice(2)));
      return;
    }

    flushList();
    paragraph.push(formatInlineMarkdown(trimmedLine));
  });

  flushParagraph();
  flushList();
  readmeContent.innerHTML = rendered.join("");
}

fetch("https://api.github.com/repos/Jmae-Eng/Jmae-Eng/readme", {
  headers: { Accept: "application/vnd.github.raw+json" },
})
  .then((response) => {
    if (!response.ok) throw new Error("README could not be loaded");
    return response.text();
  })
  .then((markdown) => {
    readmeTitle.textContent = "README";
    renderReadme(markdown);
  })
  .catch(() => {
    readmeTitle.textContent = "README unavailable";
    readmeContent.insertAdjacentHTML(
      "beforeend",
      '<p>Read the latest version on <a href="https://github.com/Jmae-Eng/Jmae-Eng" target="_blank" rel="noopener noreferrer">GitHub</a>.</p>',
    );
  });