## RequireJS demo

This is a direct translation of the FitzHugh-Nagumo simulation we did in class. However, I wanted to
try using RequireJS to split the code into multiple files so that individual shaders and scripts
could be separated into their own files.

## Setup

Most of the setup is downloading the necessary dependencies. To download each one, run the following
command or otherwise download the file at the URL:
* Abubu.js: `wget https://abubujs.org/libs/Abubu.latest.js` to get the Abubu.js library.
* require.js: `wget https://requirejs.org/docs/release/2.3.6/minified/require.js` to get the (at
  the time of writing) current version. The website will have a download link to the newest
  version.
* text.js: `wget https://raw.github.com/requirejs/text/latest/text.js` to get the text plugin for
  RequireJS. It allows RequireJS to import files directly as text, which is how the shaders get
  included.

The file `config.js` has an example of a minimal configuration for the directory structure I
chose. Specifically, I placed all of the dependencies in the `libs` directory.

## Running and testing locally

Intelligent browsers will not allow JavaScript code to read other files directly from your
filesystem. This is a good thing, so we will avoid the problem by running a simple server. In the
main directory of the demo (this directory), simply run
```bash
make server
```
and a server should start. If you click on the `fhn.html` file, you should see the simulation. The
server requires Python 3 to be installed on your system, and the `make` command requires GNU
Make. If you don't have one or more of these dependencies and don't want to install them, you can
run whatever server alternative you like.
