# Overview

MATRIX Documentation uses [MkDocs](http://www.mkdocs.org/) to format and compile Markdown into an HTML site. Choose one of the following setups to start writing documentation.

# Development Setup (Python 2.7)
> Install [pip](https://pip.pypa.io/) and [virtualenv](https://virtualenv.pypa.io/) on your computer.



Create and start a Python virtual environment.
```
virtualenv env
source env/bin/activate
```
Install the required dependencies.
```
pip install --upgrade -r requirements.txt
```
Serve the documentation locally at http://localhost:8000.
```
mkdocs serve
```

# Docker Development Setup
> [Install Docker](https://docs.docker.com/v17.12/install/) on your computer.

Download and move into the MATRIX docs.
```
git clone https://github.com/matrix-io/matrix-documentation
cd matrix-documentation
```

Create the Docker image.
```
docker build -t matrix_docs -f Dockerfile .   
```

Start a Docker container and serve the recently downloaded docs.
```
docker run -p 8000:8000 -v `pwd`/.:/volume matrix_docs
```

You can now go to http://localhost:8000 to view the docs.

# Deployment To GitHub Pages
The **master** branch will automatically be built and pushed to GitHub Pages.