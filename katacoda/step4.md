Now execute this command to stop and tear down all Docker artifacts created before using docker-compose `docker-compose scale code-cafe-machine=3`{{execute}}

Now check the Traefik dashboard - by clicking on the tab labeled *Traefik Dashboard* or by clicking on this link:
 https://[[HOST_SUBDOMAIN]]-8080-[[KATACODA_HOST]].environments.katacoda.com/dashboard/

You should see three servers for the code-cafe-machine backend.

Now try to to invoke the code-cafe-machine service - several times:
`curl -H Host:machine.code.cafe http://host01`{{execute}}

The load balancing act performed by Traefik should result in the requests being routed to different containers in a round robin pattern.
