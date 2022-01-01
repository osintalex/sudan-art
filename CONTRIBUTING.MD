# Overview

Contributions of all kinds are very welcome! Please bear in mind this is the first open source 
project I've ever run, so I may get a few things wrong but am very open to helpful pointers :sparkling_heart:
Here are some areas I'm currently looking at:

* End user experience - most users will use phones and speak Arabic
* Code readability and documentation
* Test coverage - currently very poor
* Set up accessibility with Docker
* Arabic version of site - crucial
* Security - also crucial given the political nature of the site

## Table of contents

* [Background](#background)
* [Getting Started](#getting-started)
* [To Dos](#to-dos)

## Background

This site is a full stack web application that uses:

* React for the frontend
* Django for the backend
* Docker to tie things together


## Getting Started

Please follow the set up instructions on the [homepage](https://github.com/osintalex/sudan-art#setup).
If anything doesn't work or is unclear, feel free to submit a pull request!

Make sure to run the test suites before starting work and submitting any pull requests.

## To Dos

Here is a long list of stuff to do - help welcome! :dizzy_face:

* Add unit tests to Dockerfiles
* Finish writing frontend unit tests
* Improve unit test coverage with a focus on security for backend
* A Django custom management command to add some default images to the dev server for a better local
development experience
* A Browse section on the frontend where users can scroll through recent uploads without having to search
* Arabic/English switch to change language
* Sanitize metadata on image uploads for user privacy
* Configure logs in the production web app for better debugging
* Find a performant way to get random 20 objects from the database for the landing page rather than most recent
* Try a more advanced [nginx config](https://gkedge.gitbooks.io/react-router-in-the-real/content/nginx.html) for the production version
* Remove the create react app favicon
* Reduce filesize - try using webp instead of jpeg in the backend