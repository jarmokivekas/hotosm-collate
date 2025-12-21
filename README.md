---
title: git repo reame
---

# hotosm-collate



hotosm-collate is single-page javascript app for collating data from hotosm tasking manager. 


**[Go to the app](https://jarmokivekas.github.io/hotosm-collate/app)**



---

This is a new version of the applications that was originally hosted in the jarmokivekas/hotosm-activation-gis-recources repo. This software 
is now maintained in this repo, and the previous version will eventually be taken down.

# Development environment cofiguration

```
git clone https://github.com/jarmokivekas/hotosm-collate.git
cd hotosm-collate
```

## Development server

This application is designed to be hosted on github pages, so there is not serverside component in this code base.

The tasking manager development API has localhost:3000 whitelisted as a CORS origin, you need you development server to be on port 3000. Use the root of the repository as the webroot of the server

```
cd hotosm-collate/
python3 -m http.server 3000
```

Trying to use the application via `file:///` will likely cause issues with the ES module imports used in the javascript. That's why we still need to run a server to host the files. Or you can mess with security setting in you browser config to allow ES module imports in file:/// contexts.

## API domain

Tasking manager runs a separate dev and production instance of the tasking manager api. http://localhost:3000 is only whitelisted on the dev instance. 


## Render static html

Jinja2 templates used for the articles are rendered by the collate-renderer command

```
cd hotosm-collate
python3 -m venv --prompt collate venv
source venv/bin/activate
pip install -e .
collate-renderer
```

