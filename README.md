# neo4j-crawler

## Running
### Install dependencies
Npm modules:
```
yarn
```
Start a neo4j database via docker: (db has data in your home folder for persistence)
(~~docker run --publish=7474:7474 --publish=7687:7687 --volume=$HOME/neo4j/data:/data neo4j~~)
With script:
```
yarn run-neo
```

Run server
```
sails lift
```

Server will start crawling www.google.com into depth 5.