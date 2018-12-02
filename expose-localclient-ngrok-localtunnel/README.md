# Expose local Docker Container services on the Internet

vagrant share
ngrok
localtunnel


## First steps with ngrok and Docker

Define a logical network `myngroknet`  to link two or more containers together:

```
docker network create myngroknet
```

Run a Docker Container called www based on the nginx image and associate it with the mynrgoknet network:
```
docker run -d -p 80 --net myngroknet --name www nginx
```

Run a container called ngrok based on the ngrok container image. Associate the container with the myngroknet network; this enables the container to access container www using its container name as hostname (for example http://www). Expose port 4040 - where the ngrok inspection interface is accessed. Specify that ngrok should open a tunnel (expose a public url) for HTTP requests to port 80 on container www:

```    
docker run -d -p 4040:4040 --net myngroknet  --name ngrok wernight/ngrok ngrok http www:80
```

Access ngrok monitor: access port 4040 on the Docker host. If you are running with Vagrant that is probably this URL: `http://192.168.188.142:4040`

Either from the ngrok monitor of from the command line in the Docker host using `curl $(docker port ngrok 4040)/api/tunnels` get the public url that has been assigned to the ngrok session.

Access that URL from any browser on any machine anywhere in the world. The request from the browser should be handled by the Docker Container, in this case the www container running nginx.


### Expose a local Node Application on the Internet

On the Docker host - for example the Ubuntu Linux VM created with Vagrant - clone the code-cafe GitHub repository
``` 
git clone https://github.com/AMIS-Services/code-cafe
```

Then navigate to the directory that contains the Node application that we will expose on the internet:
```
cd code-cafe/jsonata-query-and-transform-json-documents
```
And run a Docker container with a Node runtime called json-server; the current directory ($PWD) is mapped into the container at /usr/src/app. The container is associated with the myngroknet network that makes it accessible later on to the container running ngrok. 
```
docker run -it --rm -p 8080:8080 -v "$PWD":/usr/src/app --net myngroknet --name json-server node:10 bash
```
Once the container is started, you will find yourself in a shell in the container. Perform the following steps to copy the sources, install dependencies and run the Node application:
```
cp -r /usr/src/app /app

cd /app

npm install

node json-server
```

The Node application is up and listening at port 8080. You can verify this from the Docker Host `http://localhost:8080/?region=Europe` (or possibly the Windows host: `http://<vagrant VM IP>:8080/?region=Europe`.  

Run the ngrok Docker Container to create a tunnel from the a newly assigned public URL to port 8080 on the json-server container (at which the Node application is handling requests )
```
docker run -d -p 4040:4040  --net myngroknet  --name ngrok wernight/ngrok ngrok http json-server:8080
```

Inspect ngrok at port 4040 (for example `http://192.168.188.142:4040`) and learn about the public url - or use  `curl $(docker port ngrok 4040)/api/tunnels` to get that url.

Access the Node application from any client anywhere in the world (for example your mobile device) at the url: `http://<assigned ngrok id>.ngrok.io/?region=Europe`



## Resources

Ngrok: https://ngrok.com/ 

Details on Docker Container Image docker-ngrok : https://github.com/wernight/docker-ngrok 

Vagrant Share: https://www.vagrantup.com/docs/share/

LocalTunnel: https://localtunnel.me/ and https://github.com/localtunnel/localtunnel 
(LocalTunnel custom server: https://github.com/localtunnel/server)