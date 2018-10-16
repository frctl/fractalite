# Fractalite

Experimental, streamlined version of [Fractal](https://fractal.build).

- Rationalised component specification
- Plugin-based parser
- Simpler theme creation and customisation
- Improved static build performance
- Declarative CLI configuration

> Fractalite is **not** intended to be a replacement for Fractal, but rather a proposal for the way a future version of Fractal could be implemented.

> [Read more](#motivation) about the motivation behind the development of Fractalite.

## Themes

Fractalite ships with two **work-in-progress** core themes - 'Workbench' and 'Styleguide'.

> The themes are current very much at 'proof of concept' stage - very little design work has been put in yet!

#### Workbench

A minimal, development-focussed theme. Built on VueJS and providing fast preview rendering and helpful component/debugging info.

<img src="/docs/assets/theme-workbench.png" width="500" alt="Workbench theme">

Demo: https://workbench-ynsshbrrsp.now.sh

#### Styleguide

An end-user focussed theme for browsing components, variants and their related files and information.

<img src="/docs/assets/theme-styleguide.png" width="500" alt="Styleguide theme">

Demo: https://styleguide-vymbjbdsod.now.sh

## Running the demo

1. Download or clone this repo
2. `npm install` - install project-level dependencies
3. `npm run bootstrap` - install package-level dependencies, bootstrap packages together

The example project is provided in the `/demo` directory. The dependencies for the demo are bootstrapped as part of the installation process above.

Once installed, you can then run one of the following commands:

- `npm run workbench:dev` - Start the development server using the [workbench](/docs/ui.md#themes) theme
- `npm run workbench:build` - Build a static version of the [workbench](/docs/ui.md#themes) theme
- `npm run styleguide:dev` - Start the development server using the [styleguide](/docs/ui.md#themes) theme
- `npm run styleguide:build` - Build a static version of the [styleguide](/docs/ui.md#themes) theme


## Key concepts

Some work in progress documentation regarding some of the key features of Fractalite.

- [Components](/docs/components.md)
- [Parser plugins](/docs/plugins.md)
- [Render engines](/docs/engines.md)
- [UI themes](/docs/themes.md)
- [CLI](/docs/cli.md)

## Motivation

Fractalite has been put together to help address the gap between Fractal v1 and the work-in-progress Fractal v2 beta.

**Why is this needed?**

The Fractal v2 beta is very wide-ranging in scope and includes many fundamental conceptual differences from Fractal v1.

In addition, the codebase is fairly complex and the current implementation suffers from some fairly fundamental issues that still require a large amount of development time to address.

However, the v2 beta also includes many important improvements including a plugin-based parser, simplified component specification and a significantly improved configuration handling mechanism.

Fractalite is an attempt to **cherry-pick the best features from the v2 branch**, omit the problematic ones and roll everything up in a package that **feels conceptually much closer to the current v1.x release**.
