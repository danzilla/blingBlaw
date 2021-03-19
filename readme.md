# BlingBlaw -  A minimalist budget app :sparkling_heart: :sparkles: :tada:
- **Engine**		 : Node.js v8+
- **Database**	 	 : PostgreSQL
- **Server**	 	 : Node.js - Express
- **Client**	 	 : Node.js - React + Redux
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

# Requirement
- PostgreSQL (Containerized)
	- <s>Download and Install PostgreSQL</s>
- NPM and nodeJs (Containerized)
	- <s>Download and Install nodeJs v8+</s>
- Docker and Docker-compose (***Required***)
	- Download and Install Docker and Docker-compose
	- https://docs.docker.com/install/
	- https://docs.docker.com/compose/install/
- Database and pgAdmin are Containerized

# Services
| Services                | Port |
|-------------------------|------|
| Client - Frontend       | 3000 |
| Server - Backend        | 5000 |
| Database		          | 5432 |
| PGAdmin - DB Management | 5050 |


# Deployment for different environments
- blingBlaw/server/api/app.config.js
	- If Docker Deoloyment > SET (PROD) > **database_host_dev_prod.prod**
	- If Local Development > SET (DEV) > **database_host_dev_prod.dev**
```
	// Dev environment for docker_compose and npm
	const database_host_dev_prod = {
		dev: "0.0.0.0",
		prod: "postgres_db"
	}
	// DB_HOST Configuration
	const db_Host = database_host_dev_prod.dev;
```

# Deploy
- Once, you are done with the above requirements
- Require to change the Deployment for different environments for **PROD or DEV**

## :cyclone: Clone 
- Use **git** to clone the repo
	- > `git clone https://github.com/danzilla/blingBlaw.git`

## :whale: Deploy using Docker-compose
- Containerized services for
	- > Node (React) + Node (Express) + PostgreSQL + PGAdmin
- Change directory to blingBlaw
	- > `cd ./blingBlaw`
- Initiate the App
	- > Clean-docker 
		- > ```docker-compose rm -f && docker-compose build --no-cache```
	- > Prod-deploy
		- > ```docker-compose up --force-recreate```
	- > Dev-deploy
		- > ```docker-compose up -d pgadmin && docker-compose up postgres_db server client```

## :nut_and_bolt: Deploy using **NPM** (*require* - npm and nodejs)
- Change directory to blingBlaw
	- > `cd ./blingBlaw`
- Launch the app
	- > Clean-docker 
		- > `docker-compose rm -f && docker-compose build --no-cache`
	- > Install-Packages 
		- > `npm install`
	- > Client-deploy 
		- > `npm run client`
	- > Server-deploy 
		- > `npm run server`
	- > Database-deploy 
		- > `npm run db`