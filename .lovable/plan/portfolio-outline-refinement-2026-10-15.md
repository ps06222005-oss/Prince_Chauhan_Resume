# Portfolio outline refinement

## Existing page structure
The homepage is one long portfolio page: floating navigation, cinematic 3D hero, About and education, project case studies, skills, live GitHub archive, credentials, contact, and footer. It also includes mobile navigation, a resume PDF, assistant, command palette, and other interactive overlays.

## Intended edits
- Keep the existing route, content sections, real assets, resume path, 3D visual, and working features; refine the existing page rather than replace its architecture.
- Align the presentation with the uploaded outline: midnight hero, restrained blue/violet with rare warm accent, brighter readable project/about surfaces, compact navigation, and deliberate mobile stacking.
- Remove or correct claims and animated metrics that are not backed by project data or live sources; preserve verified project and profile information.
- Fix high-impact usability defects in the real contact flow, GitHub fallback metrics, mobile navigation, and project-dialog accessibility.
- Verify the resume, desktop/mobile layout, links, interactions, runtime diagnostics, and current build before completion.

## Technical details
- Reuse existing TanStack Start routes, React/Tailwind tokens, Framer Motion, and portfolio components.
- Keep `/resume.pdf` as the sole resume asset and avoid adding dependencies or fabricating visuals or content.
