# UI Generator

Fractalite provides a UI generator package that is built upon and extends the core parser package. It allows creation of powerful, theme-based interfaces for developing and documenting your component library.

## Themes

Two core themes are currently in development:

#### Workbench theme

A minimal, development-focussed theme. Built on VueJS and providing fast preview rendering and helpful component/debugging info.

<img src="/docs/assets/theme-workbench.png" width="500" alt="Workbench theme">

#### Styleguide theme

An end-user focussed theme for browsing components, variants and their related files and information.

<img src="/docs/assets/theme-styleguide.png" width="500" alt="Styleguide theme">

The [demo](/README.md#running-the-demo) provides examples of each of these themes in action.

> Themes can be customised on a per-project basis or extended and shared across projects as NPM packages.

## Dev / Build modes

The UI generator can be run in one of two modes:

- `dev`: Development mode, starts a local server and provides on-demand rebuilding of pages.
- `build`: Generates a static version of the site, suitable for distribution and hosting.
