# Traefik

TL;DR;
Traefik is an edge router, first released in 2015. It does load balancing, routing, IP white listing, SSL offloading, header rewriting, health checking, circuit breaking and service discovery. It supports dynamic reconfiguration, exposes metrics for monitoring and can be run in cluster configuration. Traefik plays very nicely with orchestation platforms - such as Kubernetes, Mesos, Swarm and Docker Engine - as well as service discovery components and configuration tools such as Consul, Eureka, etcd, Zookeeper. 

Traefik compares with HAProxy, NGinxm, Apache HTTP Server, AWS Elastic Load Balancing, Kong, Zuul and even Varnish (web application accelerator also known as a caching HTTP reverse proxy) and hardware load balancers.

[traefik.io](https://traefik.io/)

In this scenario, you will spin up a number of Docker containers. One for Traefik and two more for services that Traefik will front and route requests to and load balances requests over.

You will get a feel for the bare functionality of Traefik - and how to get it going. 