# Set the base image to Ubuntu
FROM    ubuntu:trusty

# File Author / Maintainer
MAINTAINER Danustan Alphonza

# Install Node.js and other dependencies
RUN apt-get update && \
    apt-get -y install curl && \
    curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash - && \
    apt-get -y install python build-essential nodejs

# Install nodemon
#RUN npm install -g nodemon
#RUN npm install -g npm

RUN mkdir -p /src/blingBlaw

# Define working directory
WORKDIR /src/blingBlaw
ADD . /src/blingBlaw

# Expose port
EXPOSE  3000

# Run app using nodemon
CMD ["npm", "start"]
