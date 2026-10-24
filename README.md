# Curriculum Vitae — Nand Patel

A modern, interactive 3D portfolio website showcasing Nand Patel's education, projects, skills, and certifications. Built with React, TypeScript, Vite, and Lucide React for icons.

![Preview](screenshots/preview.png)

## Overview

This website presents a structured curriculum vitae with:

- **3D Project Constellation** — Interactive visual representation of projects in a constellation layout
- **Project Showcase** — Detailed views of EduVerseSocial, JANSETU AI, and EasyPark
- **Education & Certifications** — Academic history and verified Credly badges
- **Technical Skills** — Organized by category with tags
- **Contact Section** — Email, LinkedIn, and GitHub with copy-to-clipboard functionality

## Live Demo

- [eduversesocial.vercel.app](https://eduversesocial.vercel.app/)
- [jansetu-ai-web.vercel.app](https://jansetu-ai-web.vercel.app/)
- [easy-park0.netlify.app](https://easy-park0.netlify.app/)

## Repository

- [GitHub: Nand3157/curriculum-vitae](https://github.com/Nand3157/curriculum-vitae)

## Technologies

| Category | Technologies |
|----------|------------|
| Frontend | React 18, TypeScript, Vite |
| UI | Lucide React icons, CSS custom properties |
| Build | Vite 6, TSC, ES modules |
| Deployment | Vercel, Netlify |

## Local Development

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview
```

The app runs at `http://localhost:5173` by default.

## Project Structure

```
.
├── index.html          # HTML template
├── package.json        # Dependencies and scripts
├── tsconfig.json       # TypeScript configuration
├── vite.config.ts      # Vite config with React plugin
├── src/
│   ├── App.tsx         # Main application component
│   ├── main.tsx        # ReactDOM entry point
│   ├── components/     # React components
│   │   ├── Header.tsx
│   │   ├── ProjectConstellation3D.tsx
│   │   ├── ProjectPreviewSurface.tsx
│   │   └── SelectedWorkSection.tsx
│   └── data/
│       └── resumeData.ts  # All resume/curriculum data
├── public/             # Static assets
└── screenshots/        # Screenshots for README
```

## Data Model

All resume data lives in `src/data/resumeData.ts` and includes:

- `person` — Profile: name, headline, availability, university, location, languages, summary
- `projects` — Array of `ProjectItem` with titles, categories, summaries, GitHub/live URLs, 3D coordinates, capabilities, and architecture notes
- `skills` — Skill groups by category (Programming, Web Technologies, Database, etc.)
- `education` — Education items with institution, qualification, period, and metrics
- `certifications` — Credly-verified certifications with badges

Each `ProjectItem` supports these fields:
- `id`, `title`, `category`, `summary`, `accentColor`
- `coordinates`, `capabilities`, `layers`, `architectureNotes`
- `githubUrl`, `liveDemoUrl`, `liveDomainLabel`, `repoSlug`

## Scripts

| Script | Description |
|--------|-------------|
| `bun run dev` | Start Vite dev server |
| `bun run build` | Build TypeScript and Vite assets for production |
| `bun run preview` | Preview the production build locally |

## License

This project is [MIT](LICENSE) licensed or public domain — see the LICENSE file for details.

## Contact

- **Email**: nandp3157@gmail.com
- **LinkedIn**: [linkedin.com/in/nand-patel-969652376](https://www.linkedin.com/in/nand-patel-969652376)
- **GitHub**: [github.com/Nand3157](https://github.com/Nand3157)