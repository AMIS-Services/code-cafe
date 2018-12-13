FROM node:10-alpine

EXPOSE 8080

RUN wget https://github.com/mledoze/countries/blob/master/countries.json
RUN npm install jsonata request

COPY countries-module.js .
COPY json-server.js .
COPY package.json .

CMD ["node","json-server.js"]

# docker build -t msm-countries .
# docker run -d -p 8080:8080 msm-countries

# http://localhost:8080/?name=ra&region=Europe

# find with docker ps the container to stop msm-countries
# docker stop <CONTAINER ID>
