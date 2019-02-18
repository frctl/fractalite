# Fractalite

Experimental, streamlined version of [Fractal](https://fractal.build).

## Running the demo

1. Download or clone this repo
2. `npm install` - install project-level dependencies
3. `npm run demo` - bootstrap packages together and start the demo server

## Motivation

Fractalite has been put together to help address the gap between Fractal v1 and the work-in-progress Fractal v2 beta.

**Why is this needed?**

The Fractal v2 beta is very wide-ranging in scope and includes many fundamental conceptual differences from Fractal v1.

In addition, the codebase is fairly complex and the current implementation suffers from some fairly fundamental issues that still require a large amount of development time to address.

However, the v2 beta also includes many important improvements including a middleware-based parser, simplified component specification and a plugin-based UI.

Fractalite is an attempt to **cherry-pick the best features from the v2 branch**, omit the problematic ones and roll everything up in a package that **feels conceptually much closer to the current v1.x release**.
