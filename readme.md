# BlingBlaw -  A minimalist budget app :sparkling_heart: :sparkles: :tada:
- **Engine**		 : Node.js v8+
- **Database**	 	 : PostgreSQL
- **Server**	 	 : Node.js - Express -> REST
- **Client**	 	 : Node.js - React -> Redux
- **API-Endpoint**	 : REST API

# To-Do
- [x] Long time... Jump back in. Check before change | Edited Febuary 28th, 2021
- [x] Updates packages - Client and Server | Ant.D 4.0 
- [ ] Client - Remove Local States and Redux
	- [x] Folder structure - New
	- [x] New UI Library and Same app-layout (Minimalism) - Ant Design
	- [x] Rebuild Client | No more States | Use React Hooks 
	- [ ] Draw map of React state-flow through App
	- [x] Implement - Redux-Thunk
- [ ] Server - Remove REST and Implment GraphQL
	- [x] Rebuild Server | New folder structure
	- [ ] REST API
- [ ] DevOps
	- [ ] Draw map of client
	- [ ] Draw map of server
	- [ ] Draw map of the app overview

# App Requirement
- PostgreSQL (Containerized)
	- <s>Download and Install PostgreSQL</s>
- NPM and nodeJs (Containerized)
	- <s>Download and Install nodeJs v8+</s>
- Docker and Docker-compose (***Required***)
	- Download and Install Docker and Docker-compose
	- https://docs.docker.com/install/
	- https://docs.docker.com/compose/install/
- Database and pgAdmin are Containerized*

# Deploy 
- Once, you are done with the above requirements
- Use **git** to clone the repo
	- > `git clone https://github.com/danzilla/blingBlaw.git`

## :whale: Deploy using Docker-compose
- Containerized services for
	- > Node (React) + Node (Express) + PostgreSQL + PGAdmin
- Change directory to blingBlaw
	- > `cd ./blingBlaw`
- **Initiate** the app
	- > **Clean-docker** `docker-compose rm -f && docker-compose build --no-cache`
	- > **Prod-deploy** `docker-compose up --force-recreate`
	- > **Dev-deploy** `docker-compose up -d pgadmin && docker-compose up postgres_db server client`

## :nut_and_bolt: Deploy using **NPM** (*require* - npm and nodejs)
- Change directory to blingBlaw
	- > `cd ./blingBlaw`
- **Launch** the app
	- > Install-Packages `npm install`
	- > Client-deploy `npm run client`
	- > Server-deploy `npm run server`
	- > Database-deploy `npm run db`
	- > Clean-docker `docker-compose rm -f && docker-compose build --no-cache`

