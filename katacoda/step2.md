Click on the file docker-compose.yml to open the editor.

Copy this service definition into the docker-compose.yml file:
<pre class="file" data-filename="docker-compose.yml" data-target="append">
  code-cafe-machine:
    image: katacoda/docker-http-server
    labels:
      - "traefik.backend=code-cafe-machine-echo"
      - "traefik.frontend.rule=Host:machine.code.cafe"
    networks:
      - cafenet

</pre>

Now execute this command to stop and tear down all Docker artifacts created before using docker-compose `docker-compose down`{{execute}}

Let's restart Traefik as well as the newly defined container using docker-compose `docker-compose up -d`{{execute}}.

Now check the Traefik dashboard - by click on the tab labeled *Traefik Dashboard* or by clicking on this link:
 https://[[HOST_SUBDOMAIN]]-8080-[[KATACODA_HOST]].environments.katacoda.com/dashboard/

You should see a new frontend (rule) and backend - based on the Docker container added in this step through the Traefik labels. 

Let's try to invoke the new service:
`curl -H Host:machine.code.cafe http://host01`{{execute}}
