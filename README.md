# Project Gemini

## Nodes
### Postgres Commands
- `\l` = list all databases
- `\c [dbname]` = move into that database
- `\dt` = list all tables inside a database 

## Heroku Commands
- `heroku create project-gemini`
- `heroku addons:create heroku-postgresql:hobby-dev -a project-gemini`
- `heroku git:remote -a project-gemini`

## TODO
* [x] add page to edit (the preview page but the add field button should be moved)
* [x] link button on listform page should link to actual form 
* [x] remove add field button from preview
* [x] make `ListForm.js` display grid 
* [x] add form button should link to form creation modal (instead of the displaying it)
* [x] add loading screen when `ListForm.js` is fetching forms
* [x] in the edit page, add an x button to delete form field from the form 
* [x] add routers and prefix everything with `api/` in server
* [x] add functionality to publish form
* [x] deal with empty forms on the frontend
* [x] add a created at date  field to forms so they can be order that way
* [x] implement functionality for form submission (has button for submitting to history database)
* [x] in submission form page if form is unpublished then do not display it
* [x] deploy to heroku

## streatches
* [x] add a page to display the form submissions
* [ ] in the edit page you can delete form