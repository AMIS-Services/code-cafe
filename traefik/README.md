# Traefik

TL;DR;
Traefik is an edge router. It does load balancing, routing, SSL offloading, header rewriting, health checking, circuit breaking and service discovery. It supports dynamic reconfiguration, exposes metrics for monitoring and can be run in cluster configuration. 

Traefik compares with HAProxy, NGinxm, Apache HTTP Server
 

## Getting Started with Traefik
We will run Traefik in a Docker Container. This container is configured with two volume mappings: one to load the traefik.toml configuration file and the other to integrate with Docker engine - to be able to dynamically consume changes in container status and derive backend and frontend definitions (by reading Traefik specific labels on the containers).

To get easy access to the files we will be using in this exploration, login to the VM in which the Docker engine runs, and perform the following git clone of a GitHub repository:
```
git clone https://github.com/AMIS-Services/code-cafe
```

This should result in a directory called `code-cafe` with a nested directory called `traefik`. Change directory into that nested directory:

```
cd code-cafe/traefik
```

Verify if Docker Compose is already installed on your system:
```
docker-compose --version
```
If it is not, install Docker Compose using the instructions in the next section. If it is, skip this section.

### Install Docker Compose
Install docker-compose on the Linux VM on which you use Docker:
https://linuxize.com/post/how-to-install-and-use-docker-compose-on-ubuntu-18-04/


Download the Docker Compose binary into the /usr/local/bin directory with the following curl command:

```
sudo curl -L "https://github.com/docker/compose/releases/download/1.23.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

Once the download is complete, apply executable permissions to the Compose binary:
```
sudo chmod +x /usr/local/bin/docker-compose
```
Verify the installation by running the following command which will display the Compose version:

```
docker-compose --version
```

### Run Traefik to proxy for a Search Service
Our first encounter with Traefik will be a not very typical use case - but it will allow you to get an appreciation for what Traefik does and how it is configured.

In this case we will consider a number of internet search engines (Google, Bing, Yahoo, DuckDuckGo) as our backends. We will use Traefik as a proxy - the edge router that we send our requests to. We will send requests to search.com and these requests are handled by Traefik and routed to the configured search services. 

Note: we can make more complex frontend rules to make routing more interesting.

Navigate to the `search` child directory:

```
cd search
```
Take a look at second part of the file `traefik.toml` - the part starting with `[file]`:
```
cat traefik.toml
```
You will notice the definition of a single backend - `backendsearch`. The instance of Traefik configured through this file can route requests to single logical backend. This backend covers three back end services - described by the three server entries - that will receive traffic in equal portions.

Run the following command - to start Traefik.
```
docker-compose up -d
```
This will start Traefik from the official Docker Container image.

Verify if the Traefik container is running:
```
docker ps
```
To check on the logging from the container running Traefik:
```
docker logs <container id> -- follow
```

For the best results, you can now add the following host definitions to the hosts file on your laptop

(on Windows this file is located in C:\Windows\System32\drivers\etc)
```
192.168.188.142 search.com
```

Replace 192.168.188.142 with whatever is the IP address of your local VM.

Enter `http:\\search.com` in the location bar of your brower and press enter. You should be taken two one of the search services configured in traefik.toml. Navigate once more to `http:\\search.com` - in the same or a different browser window. You will get to a different search service. Repeat this a few times.

If you change the relative weight settings in `traefik.toml` or you uncomment the Yahoo search service or you change the order of the search service - you will influence the behavior of Traefik in exactly the way you expect.

You can make life even more interesting by for example specifying timeout settings, adding a circuit breaker condition and a non existing search service. Depending on the circuit breaker condition, you should get no more than a few errors from the non existing service before Traefik starts skipping that backend service.

#### Monitor

To check on the health of Traefik, you can use the endpoint `http://<IP of your VM>:8080/ping` - in my case `http://192.168.188.142:8080/ping`.

Metrics are exposed at `http://<IP of your VM>:8080/metrics` - in my case `http://192.168.188.142:8080/metrics`. This the endpoint you can configure with Prometheus to scrape metrics from.

The dashboard - which provides a web based overview of backends and frontends - can be accessed at`http://<IP of your VM>:8080/dashboard` - in my case: `http://192.168.188.142:8080/dashboard/`.

### Traefik Routing to Docker Containers
One of the very nice things about Traefik is the fact that it can do service discovery. Backends and frontends not only can be configured in a configuration file - or specified through REST API calls - but they can also be read from runtime orchestration engines such as Kubernetes, Mesos, Swarm and Docker engine - as well as from other service discovery mechanisms.

In this example we will look at the integration of Traefik with Docker: not only is Traefik running in a Docker container, it will also read from the Docker engine's API about other Docker containers. If these other containers are labeled with tags that Traefik can recognize, it can start routing traffic to these containers as backends as prescribed by the rules specified through these tags.

Note that Traefik is also aware of additional instances of container images and will automatically start load balancing across multiple instances, just as it will stop sending requests to a container that has been stopped.

Change into the directory docker-backend.

```
cd ../docker-backend
```


## Resources

Katacoda Scenario: https://www.katacoda.com/courses/traefik/deploy-load-balancer 