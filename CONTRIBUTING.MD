# Overview

Contributions of all kinds are very welcome! Please bear in mind this is the first open source
project I've ever run, so I may get a few things wrong but am very open to helpful pointers :sparkling_heart:
Here are some areas I'm currently looking at:

- End user experience - most users will use phones and speak Arabic
- Code readability and documentation
- Test coverage - currently very poor
- Set up accessibility with Docker
- Arabic version of site - crucial
- Security - also crucial given the political nature of the site

## Table of contents

- [Background](#background)
- [Getting Started](#getting-started)
- [To Dos](#to-dos)

## Background

This site is a full stack web application that uses:

- React for the frontend
- Django for the backend
- Docker to tie things together

## Getting Started

Please follow the set up instructions on the [homepage](https://github.com/osintalex/sudan-art#setup).
If anything doesn't work or is unclear, feel free to submit a pull request! Please create a new branch for your work,
push to the remote and then ask to merge.

Please also make sure to run the test suites before starting work and submitting any pull requests.

## To Dos

Here is a list of stuff to do - help welcome! :dizzy_face:

- Add intelligent default parameters to social buttons in imagePopover.js
- CI setup if more people start to work on the project
- Change backend upload validation errors to codes so these can be handled in different languages in the frontend
- Include right text alignment as part of the usecontext language hook to handle arabic text better
- Add more Arabic translation
