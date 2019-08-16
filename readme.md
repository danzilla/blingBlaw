# BlingBlaw -  A minimalist budget app :sparkling_heart: :sparkles: :tada:
- **Engine**		 : Node.js v8+
- **Database**	 	 : PostgreSQL
- **Server**	 	 : Node.js - Express -> GraphQL -> PostGraphile
- **Client**	 	 : Node.js - React -> Redux -> Apollo client
- **API-Endpoint**	 : REST (Migrating to GraphQL)

# To-Do | Edited: Aug 7th, 2019
- [ ] Client - Remove Local States and Redux
	- [ ] Rebuild Client | No more States | Use React Hooks | New UI Library and Same layout (Minimal)
	- [ ] Redux Implement
	- [ ] Apollo Client Implement
- [ ] Server - Remove REST and Implment GraphQL
	- [x] Rebuild Server | New folder structure
	- [ ] REST for Authentication and ActiveToken
	- [ ] Graphql and postgresSQL - SQL
	- [ ] PostGraphile Implement
- [ ] DevOps
	- [ ] Draw map of client
	- [ ] Draw map of server
	- [ ] Draw map of the app overview

# App Requirement
- PostgreSQL (Containerized)
	- <s>Download and Install PostgreSQL</s>
- NPM and nodeJs (Containerized)
	- <s>Download and Install nodeJs v8+</s>
- Docker and Docker-compose (<span style="color:hotpink">*Required*</span>)
	- Download and Install Docker and Docker-compose
	- https://docs.docker.com/install/
	- https://docs.docker.com/compose/install/

# Deploy 
- Once, you are done with the above requirements
- Use **git** to clone the repo
	- > `git clone https://github.com/danzilla/blingBlaw.git`

##  :whale: Deploy using Docker-compose :whale2:
- Change directory to blingBlaw
	- > `cd ./blingBlaw`
- **Run** the app
	- > `npm run docker-clean`
	- > Prod-deploy `npm run start-prod`
	- > Dev-deploy `npm run start-dev`
- Containerized services for
	- > Node (React) + Node (Express) + PostgreSQL + PGAdmin