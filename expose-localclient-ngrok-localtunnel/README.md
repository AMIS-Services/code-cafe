# Expose local Docker Container services on the Internet

The challenge: you are running a service, API or web application locally on your laptop, in a Docker container. You would like to provide access to external consumers - yourself on your smart phone, a piece of code running in a cloud environment, a colleague on your local network or on the other side of the world.

We will look at how ngrok - a tool and a cloud service - makes this happen. It generates a public URL and ensures that all requests sent to that URL are forwarded to a local agent (running in its own, stand alone Docker container) that can then pass them on to the local service. See https://technology.amis.nl/2016/12/07/publicly-exposing-a-local-service-to-nearby-and-far-away-consumer-on-the-internet-using-ngrok/ for an introduction to ngrok.


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


## Localtunnel

localtunnel exposes your localhost to the world for easy testing and sharing! No need to mess with DNS or deploy just to have others test out your changes.

Check out: https://github.com/localtunnel/localtunnel

Localtunnel is available in a Docker Container, very similar to the ngrok solution discussed overhead:
https://hub.docker.com/r/efrecon/localtunnel/.

Note: localtunnel can use localtunnel.me as its server - or you can run your own server to handle all requests (see: https://github.com/localtunnel/server)

## Vagrant Share

Vagrant Share allows you to share your Vagrant environment with anyone in the world, enabling collaboration directly in your Vagrant environment in almost any network environment with just a single command: `vagrant share`. 

See https://www.vagrantup.com/docs/share/ for details and http://www.gizmola.com/blog/archives/121-Vagrant-Share-and-Ngrok.html for more background.


## Resources

Ngrok: https://ngrok.com/ 

Details on Docker Container Image docker-ngrok : https://github.com/wernight/docker-ngrok 

Vagrant Share: https://www.vagrantup.com/docs/share/

LocalTunnel: https://localtunnel.me/ and https://github.com/localtunnel/localtunnel 
(LocalTunnel custom server: https://github.com/localtunnel/server)