# Darren Christopher Tang — Portfolio

A recruiter-facing, multi-page software engineering portfolio for
**Darren Christopher Tang** — full-stack and AI agent engineer.

Built with React, TypeScript, Vite, Tailwind CSS, React Router, Framer Motion,
and Lucide React icons. Designed to feel like a calm, modern developer
workstation rather than a game skin.

---

## Screenshots

Screenshots go in `public/projects/<project-id>/` and can be linked from
`src/data/projects.ts`. Add site-level captures (home, about, projects, etc.) to
`docs/screenshots/` and reference them here once available.

- `docs/screenshots/home.png` — Home hero + navigation cards
- `docs/screenshots/about.png` — Character Stats page
- `docs/screenshots/projects.png` — Builds Gallery
- `docs/screenshots/resume.png` — Resume Viewer
- `docs/screenshots/contact.png` — Trading Post

---

## Tech stack

- **Framework**: React 18 + TypeScript (strict)
- **Bundler**: Vite 5
- **Routing**: React Router v6 (BrowserRouter)
- **Styling**: Tailwind CSS 3 with a custom navy / mist / cyan palette
- **Motion**: Framer Motion with `useReducedMotion` fallbacks
- **Icons**: Lucide React
- **SEO**: `react-helmet-async` per-route titles + Open Graph / Twitter tags
- **Fonts**: Space Grotesk (display), Inter (body), JetBrains Mono (mono)

---

## Local setup

Requires Node.js 18+ (Node 20+ recommended) and npm 9+.

```bash
git clone <your-fork-url> portfolio
cd portfolio
npm install
cp .env.example .env.local   # optional — needed only for a live contact form
npm run dev
```

The dev server runs on http://localhost:5173.

---

## Scripts

| Command             | Description                                   |
| ------------------- | --------------------------------------------- |
| `npm run dev`       | Start the Vite dev server                     |
| `npm run build`     | Type-check and create a production build      |
| `npm run preview`   | Preview the production build locally          |
| `npm run typecheck` | Run `tsc` without emitting output             |

---

## Production build

```bash
npm run build
npm run preview
```

The compiled site lands in `dist/` and can be deployed as static files.

---

## Deployment

### Vercel

1. Push this repository to GitHub.
2. Import the project on Vercel.
3. Framework preset: **Vite**. Build command `npm run build`, output `dist`.
4. `vercel.json` in this repo rewrites all routes to `/` so React Router works
   with direct links and refreshes.

### Netlify

1. Push this repository to GitHub.
2. Create a new site from Git on Netlify.
3. Build command `npm run build`, publish directory `dist`.
4. `netlify.toml` and `public/_redirects` handle SPA fallback routing.

Either platform serves the site as static files — no server required.

---

## Links & contact

Social links and contact email are configured in `src/data/socials.ts`:

- GitHub: https://github.com/tangdarren
- LinkedIn: https://www.linkedin.com/in/tang-darren
- Email: tang.darren@gmail.com

Project GitHub URLs live in `src/data/projects.ts`. Omit `githubUrl` /
`liveUrl` when a public repo or demo is unavailable — the UI hides those
buttons instead of showing placeholders.

Before publishing to a custom domain, replace `example.com` in `index.html`,
`public/sitemap.xml`, `public/robots.txt`, and
`src/components/layout/SEO.tsx`.

---

## Adding the résumé PDF

Place your résumé at:

```
public/resume/Darren_Tang_Resume.pdf
```

If you rename the file, update `RESUME_PDF_PATH` in `src/data/socials.ts`.
When no PDF is present, the embedded viewer gracefully falls back to a download
prompt.

---

## Adding project screenshots

1. Add images under `public/projects/<project-id>/`.
2. Add an `image` field on the corresponding entry in `src/data/projects.ts` if
   you want to swap the abstract thumbnail for a real screenshot.
3. Detailed screenshots for the project details modal can be dropped into
   `ProjectDetails.tsx` in the `Screenshots` section.

---

## Contact form environment variables

The contact form reads a single Vite env var:

```
VITE_CONTACT_ENDPOINT=<your provider or proxy URL>
```

Suggested providers:

- **Formspree** — set to `https://formspree.io/f/<your-form-id>`.
- **Resend / EmailJS** — set to your own `/api/contact` proxy that keeps the
  provider's secret key on the server side.
- **Custom backend** — any endpoint that accepts a JSON body of
  `{ name, email, subject, message }` and returns a 2xx on success.

When the env var is not set, the form still validates input, then opens a
`mailto:` link to `tang.darren@gmail.com` with the entered subject and message.
It reports “Opening your email application” and never claims the message was
sent server-side.

**Never** paste a secret API key into frontend code. Only public/publishable
endpoints belong in `VITE_*` variables. Keep private keys behind a backend
proxy.

---

## Project structure

```
public/
  favicon.svg
  og-image.svg
  robots.txt
  sitemap.xml
  _redirects
  resume/                # place Darren_Tang_Resume.pdf here
  projects/              # per-project image folders

src/
  components/
    layout/
      Footer.tsx
      Layout.tsx
      Monogram.tsx
      Navbar.tsx
      PageHeader.tsx
      PageTransition.tsx
      ScrollToTop.tsx
      SEO.tsx
    home/
      DashboardVisual.tsx
      Hero.tsx
      NavigationCard.tsx
    about/
      AchievementCard.tsx
      ExperienceTimeline.tsx
      ProfileCard.tsx
      SkillsInventory.tsx
    projects/
      ProjectCard.tsx
      ProjectDetails.tsx
      ProjectFilters.tsx
      ProjectThumbnail.tsx
    resume/
      ResumeViewer.tsx
    contact/
      ContactForm.tsx
      ResumePanel.tsx
      SocialLinks.tsx
  data/
    experience.ts
    navigation.ts
    projects.ts
    skills.ts
    socials.ts
  pages/
    AboutPage.tsx
    ContactPage.tsx
    HomePage.tsx
    NotFoundPage.tsx
    ProjectsPage.tsx
    ResumePage.tsx
  routes/
    AppRouter.tsx
  App.tsx
  index.css
  main.tsx
```

Structured data lives in `src/data/*` so that project, skill, experience,
navigation, and social-link content can be edited without touching component
markup.

---

## Accessibility notes

- Semantic HTML throughout (`header`, `nav`, `main`, `footer`, `section`,
  `article`, `aside`, `ol/ul`, `dialog`).
- Skip-to-content link is the first focusable element.
- Every interactive element has a visible focus ring (via `:focus-visible`).
- Nav, footer, filters, and form controls have descriptive labels.
- The project details modal traps focus loosely (focuses close button on open,
  restores previous focus on close) and closes on `Escape` or backdrop click.
- Icon-only buttons carry `aria-label`s. Charts and thumbnails carry `role="img"`
  with descriptive `aria-label`s.
- The site honors `prefers-reduced-motion` — Framer Motion transitions collapse
  to opacity-only, and the global stylesheet neutralizes CSS animations.
- Color contrast targets ≥ 4.5:1 for body text on the dark navy background.

---

## Credits

Site structure was inspired by modern multi-page developer portfolios that
separate landing, about, projects, résumé, and contact into their own routes.
No third-party portfolio's assets, source code, imagery, or original design
were reused — the visual identity, components, and copy in this repository are
original.

Icons courtesy of [Lucide](https://lucide.dev/). Fonts by
[Google Fonts](https://fonts.google.com/) (Inter, Space Grotesk, JetBrains
Mono).
