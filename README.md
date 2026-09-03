# Abhinav Bajpai — Professional Portfolio Website

**Live Site:** [https://scmbyabhinav.github.io/](https://scmbyabhinav.github.io/)

A production-ready, internationally-compliant personal portfolio website built for GitHub Pages deployment. Designed to WCAG 2.1 AA standards with full mobile responsiveness, dark mode, SEO optimization, and cross-cultural accessibility.

---

## 📁 Project Structure

```
scmbyabhinav.github.io/
│
├── index.html              # Main website (semantic, accessible, SEO-optimized)
├── style.css               # Complete stylesheet (mobile-first, dark mode, RTL-ready)
├── script.js               # Vanilla JS (ES6+) — no dependencies
├── robots.txt              # Search engine crawling instructions
├── sitemap.xml             # XML sitemap for search engines
├── README.md               # This file
│
├── assets/
│   ├── abhinav-bajpai-professional.png   # Professional portrait
│   ├── favicon.svg                       # Site favicon (SVG)
│   │
│   └── projects/           # Sanitized professional case studies
│       └── README.txt      # Instructions for adding projects
│
└── documents/
    └── Abhinav_Bajpai_Resume.pdf         # Downloadable resume
```

---

## 🚀 Deployment Instructions (GitHub Pages)

### Step 1: Upload Files
1. Go to your GitHub repository: `scmbyabhinav/scmbyabhinav.github.io`
2. Upload **all files** from this folder to the repository root
3. Ensure `index.html` is in the root directory

### Step 2: Enable GitHub Pages
1. Go to **Repository Settings** → **Pages**
2. Under **Build and deployment**:
   - **Source**: Deploy from a branch
   - **Branch**: `main` → `/ (root)`
3. Click **Save**
4. Your site will be live at: `https://scmbyabhinav.github.io/`

### Step 3: Verify (5-10 minutes)
- Visit `https://scmbyabhinav.github.io/`
- Check that all images, styles, and scripts load correctly
- Test on mobile and desktop

---

## 🎯 Features & Standards

| Standard | Status | Details |
|----------|--------|---------|
| **WCAG 2.1 AA** | ✅ | Alt text, ARIA labels, keyboard nav, focus indicators, 4.5:1 contrast |
| **Responsive** | ✅ | Mobile-first, breakpoints: 320/480/768/1024/1440/1920px |
| **SEO** | ✅ | Meta tags, Open Graph, Twitter Cards, JSON-LD Schema.org, canonical URLs |
| **Performance** | ✅ | Lazy loading, optimized images, minimal CLS, preconnect hints |
| **Dark Mode** | ✅ | Toggle + `prefers-color-scheme` support |
| **RTL Ready** | ✅ | CSS logical properties, `dir="rtl"` compatible |
| **i18n Ready** | ✅ | Structured for multi-language expansion |
| **GDPR/CCPA** | ✅ | Cookie consent banner with accept/decline |
| **Print CSS** | ✅ | Optimized print layout |
| **Accessibility** | ✅ | Skip link, semantic HTML, focus management, reduced motion |

---

## 🛠 Tech Stack

- **HTML5** — Semantic structure, ARIA landmarks
- **CSS3** — Custom properties, Flexbox, Grid, `clamp()` fluid typography
- **Vanilla JavaScript (ES6+)** — No frameworks, no dependencies
- **Google Fonts** — DM Sans + Manrope with `font-display: swap`
- **SVG Favicon** — Scalable, theme-aware

---

## 📝 Content Sections

1. **Hero** — Introduction, portrait, MIT badge, quick contact
2. **Stats Bar** — Key metrics (15+ years, ₹500Cr+ dispatch, etc.)
3. **Trust Bar** — Affiliations and credentials
4. **About** — Professional summary, highlights, attributes
5. **Expertise** — 6 capability cards (Supply Chain, Imports/Exports, etc.)
6. **Impact** — Quantifiable results (₹15Cr+ savings, promotions, awards)
7. **Experience** — Timeline: AWL, ACE, Roca, Essar
8. **Projects** — Case study cards with email request links
9. **Education** — MIT, MLSU, Mumbai, NIIT + certifications
10. **Quote** — Professional philosophy
11. **Contact** — Phone, email, LinkedIn cards

---

## 🎨 Customization

### Change Colors
Edit CSS custom properties in `:root` at the top of `style.css`:
```css
--color-gold: #c89a28;    /* Primary accent */
--color-blue: #2d6cdf;    /* Secondary accent */
--color-ink: #0b1322;     /* Primary text */
```

### Add Projects
1. Add sanitized (non-confidential) files to `assets/projects/`
2. Update the Projects section in `index.html`
3. **Never upload confidential company data**

### Add Custom Domain
1. Go to **Repository Settings** → **Pages** → **Custom domain**
2. Enter your domain (e.g., `abhinavbajpai.com`)
3. Update `canonical` URL in `index.html` `<head>`
4. Update `sitemap.xml` and `robots.txt` URLs

---

## 🔍 SEO Checklist

- [ ] Verify Google Search Console ownership
- [ ] Submit sitemap: `https://scmbyabhinav.github.io/sitemap.xml`
- [ ] Request indexing for the homepage
- [ ] Update LinkedIn profile with website URL
- [ ] Add website to resume and email signature

---

## ♿ Accessibility Notes

- All images have descriptive `alt` text
- Interactive elements have minimum 44×44px touch targets
- Focus indicators are visible on all focusable elements
- Color contrast ratios meet WCAG AA (4.5:1 minimum)
- `prefers-reduced-motion` is respected
- Skip link allows keyboard users to bypass navigation

---

## 📄 License

© 2026 Abhinav Bajpai. All rights reserved.

---

## 📧 Contact

For issues or updates, contact: **abhinavbajpai3005@gmail.com**
