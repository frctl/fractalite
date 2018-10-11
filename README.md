# Fractalite

Experimental, stripped-down version of [Fractal](https://fractal.build).

Key features include:

- Plugin-based component parser
- Declarative CLI configuration
- Theme-driven UI builder
- Better separation of concerns

# Installation

1. Download or clone this repo
2. `npm install` - install project-level dependencies
3. `npm run bootstrap` - install package-level dependencies, bootstrap packages together

# Running the demo

An example project is provided in the `/demo` directory. The dependencies for the demo are bootstrapped as part of the installation process above.

Once installed, `cd demo` to move into the demo directory and then run one of the following commands:

- `npm run workbench:dev` - Start the development server using the **workbench** theme
- `npm run workbench:build` - Build a static version of the **workbench** theme
- `npm run styleguide:dev` - Start the development server using the **styleguide** theme
- `npm run styleguide:build` - Build a static version of the **styleguide** theme
