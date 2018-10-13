# Fractalite

Experimental, stripped-down version of [Fractal](https://fractal.build), featuring:

- Simplified component specification
- Plugin-based component parser
- Declarative CLI configuration
- Customisable, theme-driven UI builder
- Improved UI static build performance

Fractalite removes many of the more opinionated and/or complex features from the core Fractal feature set. A plugin system allows for adding missing or additional functionality in as required.

## Themes

Fractalite ships with two **work-in-progress** core themes - 'Workbench' and 'Styleguide'.

> Please note that the themes are current very much at 'proof of concept' stage - very little design work has been put in yet!

#### Workbench

A minimal, development-focussed theme. Built on VueJS and providing fast preview rendering and helpful component/debugging info.

<img src="/docs/assets/theme-workbench.png" width="500" alt="Workbench theme">

Demo: https://workbench-dhzqwqhepu.now.sh/

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


## Documentation/notes

- [Components](/docs/components.md)
- [Parser plugins](/docs/plugins.md)
- [Render engines](/docs/engines.md)
- [UI themes](/docs/themes.md)
- [CLI](/docs/cli.md)
