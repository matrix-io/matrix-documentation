# README

MATRIX Documentation uses [MkDocs](http://www.mkdocs.org/) to format and compile Markdown into a HTML site.

# Install Dependencies
1. Install [pip](https://pip.pypa.io/) and [virtualenv](https://virtualenv.pypa.io/) if you do not already have them.
2. Create a virtualenv. Samples compatible with Python 2.7 and 3.4+.
3. Optionally you may also want to install [virtualenv wrapper](https://virtualenvwrapper.readthedocs.io/en/latest/)
   to make your life easier.

```
$ virtualenv env
$ source env/bin/activate
```

```
# Do this to get the docs running locally.
pip install --upgrade -r requirements.txt
mkdocs serve
```

### Deployment
The master branch will automatically be built and pushed to GitHub Pages.
