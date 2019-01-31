# Katacoda

TL;DR;
Learn new technologies using real environments - right in your browser. Katacoda is an online platform that offers hundreds of scenarios and sandbox environments to learn about and play with different kinds of technologies. Katacoda is special in that it not only offers the handson instructions - it also provides the runtime environment in which these steps can be executed instantly. Examples of such environments: Linux server, Docker engine, Kubernetes cluster and almost anything that can be run as container. 

Some of the technologies for which Katacoda has scenarios and playground environments - but this is list is by no means exhaustive:
* Kubernetes
* Docker
* Prometheus
* Linux
* Machine Learning
* .NET (on Linux)
* Git
* Consul
* Istio

When you want to learn about a technology, one of the easiest way to get started frequently is a Katacoda scenario - not least of all because it comes with a ready to play environment, right in your browser.

[Katacoda.com](https://www.katacoda.com/)


### Custom Scenarios
Katacoda users can also make use of the Katacoda platform to create their own scenarios. The workshop assignments that we create for Code Cafe or SIG sessions could in many cases be created as Katacoda scenario that we could work through in our browser. No local installation, no time lost with configuration issues etc. And free.


## Try out Scenarios and Playgrounds
To get acquainted with Katacoda, let's try out some of the scenarios.

You could try the Katacoda Scenario for Traefik - (Load Balance Containers using Traefik:)  [https://www.katacoda.com/courses/traefik/deploy-load-balancer] - this corresponds largely with the Code Cafe handson exercise described [here](https://github.com/AMIS-Services/code-cafe/tree/master/traefik).

Some nice other options: 
* [Weavescope - for visualizing Docker Containers and their dependencies](https://www.katacoda.com/courses/weave/hello-scope) (and allowing shells opened in containers from a browser UI)
* A 17-scenario [course on Kubernetes](https://www.katacoda.com/courses/kubernetes)
* A 10-step [course on Git](https://www.katacoda.com/courses/git)
* [Building and Running MySQL on Docker](https://www.katacoda.com/deepaksks/scenarios/1)
* [Get going with MongoDB](https://www.katacoda.com/oshany/scenarios/mongodb)
* [First steps with Ansible](https://www.katacoda.com/jonatanblue/scenarios/1)

Try out one of the Playgrounds at [Playgrounds](https://www.katacoda.com/search?q=playground&hPP=12&idx=scenarios&p=0&is_v=1) - for example Ubuntu, OpenShift, Kubernetes, Ansible, Node, PHP, ASP.NET Core


## Create a Custom Scenario
In addition to walking through an existing scenario or playing with a technology in a Playground, you can also create your own scenario - for others to walk through. This is a great way to teach a certain tool, technology component or feature to others. 

In order to create a custom Katacoda scenario, you have to sign up for the platform, using a GitHub account, at: [sign up](https://www.katacoda.com/signup). Once you do, a repository will be created in your GitHub environment with an hello world Katacoda scenario, that through webhooks is synchronized with the Katacoda platform. This means you are in business immediately. You can then tinker with the scenario as well as create new ones. See for a good introduction and overview [this Medium article](https://medium.com/@IrekRomaniuk/learn-and-teach-with-katacoda-d3ba4dce4e04).

Once signed up and signed in, you can go to [create scenario](https://www.katacoda.com/create) to create a scenario or edit one you have already started work on.

Katacoda has recently started to offer a [CLI tool](https://www.katacoda.com/cli) which which you can "Create and manage courses and scenario from the command-line".

Documentation on how to create a scenario can be found [here](https://www.katacoda.com/docs).

A [list of all available base environments](https://www.katacoda.com/docs/scenarios/environments) that can be used for scenarios is provided; the list includes Java, C#, Go, .Net Core, Ubuntu, Bash, Kubernetes. Code for some example scenarios is available [in GitHub](https://github.com/katacoda/scenario-examples).

### Quick creation of Custom Scenario 
We will quickly go through the creation of a custom Katacoda scenario that has the user run several Docker containers using Docker-Compose.

Prerequisite: signed up with Katacoda using your GitHub account.

Working on a Linux system, for example the VM used for running the Docker engine.

To install the CLI

```
curl -s https://cli.katacoda.com | sudo sh
```
To start creation of a new scenario:
```
katacoda create scenario
```

Provide the URL to the GitHub katacoda repsoitory in your account, something like `https://github.com/your-username/katacoda-scenarios` .

For example this scenario title: `Traefik and Docker Compose in action`. Type a description:
```
In this scenario, we will use `docker-compose` to start several containers that are behind a single Traefik edge router instance that performs routing and load balancing. Labels on the containers provide instructions to Traefik. Note that Traefik itself also runs in a Docker container.
```
Then enter the the id of the environment, based on this [list of all available base environments](https://www.katacoda.com/docs/scenarios/environments). The default is *docker* which is what we need here.

Next you need to specify the layout for the scenario - choose from this [list](https://katacoda.com/docs/scenarios/layouts). Let's do *editor-terminal*.

This completes the CLI wizard. A folder has been created - something like *httpsgithubcomYourUserNamekatacoda-scenarios* . The folder contains markdown files for the steps in the scenario. The `index.json` file is the configuration file with details on layout and environment image. Using normal git operations you can commit and push these files after editing them. 
```
git stage *
git commit -m"Initial creation of scenario"
git push
```
After every push, the live Katacoda environment is refreshed and you can try out the current state of the scenario, at `https://katacoda.com/<Your UserName>`.

Feel free to start editing the files a little and see how you can construct your scenario. Or head over to the next section where you will implement a fairly rich scenario.

### Creating a Traefik scenario
The scenario we will work on this based on the *docker-backend* section in this [Code Cafe item on Traefik](https://github.com/AMIS-Services/code-cafe/tree/master/traefik).

Note: the sources for this completed scenario are in [GitHub](https://github.com/lucasjellema/katacoda-scenarios/tree/master/httpsgithubcomlucasjellemakatacoda-scenarios). Feel free to clone this repo or copy the contents from its files.

Note: you can see this scenario live at [https://www.katacoda.com/lucasjellema/scenarios/httpsgithubcomlucasjellemakatacoda-scenarios] 

The objective of this scenario is to have the player/student work in a Docker environment, start up a container with Traefik and run two more containers with appropriate Traefik labels that will trigger Traefik into routing requests to these containers - and load balancing traffic across multiple instances of one of the services.

The steps and somteimes challenges in creating the scenario:
* select environment, layout (docker, editor-terminal)
* specify the Traefik dashboard as available UI 
* add an initial docker-compose.yml file
* copy content to the docker-compose.yml file - opened in the editor
* copy and execute commands to the command line
* open an URL on the live environment in a new browser window
* execte a curl command against the Docker containers running in the live environent

#### Steps

Create a new folder `assets` in the root of the Katacoda scenario project.

Create a new file docker-compose.yml in this folder `assets`. Add the following initial content:
```
version: "3"

networks:
  cafenet:

services:
  proxy:
    image: traefik
    command: --web --web.metrics.prometheus --web.metrics.prometheus.buckets="0.1,0.3,1.2,5.0" --docker --docker.domain=docker.localhost --logLevel=DEBUG
    ports:
      - "80:80"
      - "8080:8080"
      - "443:443"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - /dev/null:/traefik.toml
    networks:
      - cafenet
```
Copy file step1.md to step3.md and step4.md.

The file index.json holds the overall definition of the Scenario. Edit the file index.json to contain the following:
```
{
  "title": "Traefik and Docker Compose in action",
  "description": "In this scenario, we will use `docker-compose` to start several containers that are behind a single Traefik edge router instance that performs routing and load balancing. Labels on the containers provide instructions to Traefik. Note that Traefik itself also runs in a Docker container.",
  "difficulty": "beginner",
  "time": "10-15 minutes",
  "details": {
    "steps": [
      {
        "title": "Run Traefik using Docker Compose",
        "text": "step1.md"
      },
      {
        "title": "Step 2 - Start a Docker Container that Traefik Routes traffic to",
        "text": "step2.md"
      },
      {
        "title": "Step 3 - Start a second Docker Container that Traefik also Routes traffic to",
        "text": "step3.md"
      },
      {
        "title": "Step 4 - Scale Up one of the Docker Contains and watch how Traefik starts load balancing",
        "text": "step4.md"
      }
    ],
    "intro": {
      "text": "intro.md"
    },
    "finish": {
      "text": "finish.md"
    },
    "assets": {
      "client": [
        {
          "file": "docker-compose.yml",
          "target": "~/"
        }
      ]
    }
  },
  "environment": {
    "showdashboard": true,
    "dashboards": [
      {
        "name": "Traefik Dashboard",
        "port": 8080
      }
    ],
    "uilayout": "editor-terminal",
    "uimessage1": "\u001b[32mYour Interactive Bash Terminal. A safe place to learn and execute commands.\u001b[m\r\n",
  },
  "backend": {
    "imageid": "docker"
  }
}
```
Some relevant elements:
* definition of the backend: `"imageid": "docker"`
* definition of uilayout: `"uilayout": "editor-terminal"`
* definition of the Traefik dashboard - available in a separate browser window, opening port 8080 on the live environment: `{ "name": "Traefik Dashboard","port": 8080 }`
* the assets - file docker-compose.yml to be copied from folder `assets` to the root of the live environment
* the meta data for the scenario: number of steps, titles for intro, steps and finish/summary page

Add the following content to `step1.md`
```
Execute this command to run docker-compose `docker-compose up -d`{{execute}}

When the previous command is complete, check the Docker containers running `docker ps`{{execute}}

Checkout the Traefik dashboard - by click on the tab labeled *Traefik Dashboard* or by clicking on this link:
 https://[[HOST_SUBDOMAIN]]-8080-[[KATACODA_HOST]].environments.katacoda.com/dashboard/

The Traefik metrics are available at:
 https://[[HOST_SUBDOMAIN]]-8080-[[KATACODA_HOST]].environments.katacoda.com/metrics

The Traefik API is exposed at:
 https://[[HOST_SUBDOMAIN]]-8080-[[KATACODA_HOST]].environments.katacoda.com/api
```
At this point, you have a valid scenario - even though a little bare. You can git commit your changes and push them. Then run the scenario as it currently stands on Katacoda.

To see Traefik actually doing something, add the following content to `step2.md`
```
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
```

Again, commit and push to git. Run the modified scenario on Katacoda.

Add the following content to `step3.md`
```
Click on the file docker-compose.yml to open the editor.

We will startup another container that will result in one more frontend associated with a new backend.

Copy this service definition into the docker-compose.yml file:
<pre class="file" data-filename="docker-compose.yml" data-target="append">
  code-cafe-echo:
    image: katacoda/docker-http-server:v2
    labels:
      - "traefik.backend=code-cafe-echo"
      - "traefik.frontend.rule=Host:echo.code.cafe"
    networks:
      - cafenet

</pre>

Now execute this command to stop and tear down all Docker artifacts created before using docker-compose `docker-compose down`{{execute}}

Let's restart Traefik as well as the newly defined container using docker-compose `docker-compose up -d`{{execute}}.

Now check the Traefik dashboard - by click on the tab labeled *Traefik Dashboard* or by clicking on this link:
 https://[[HOST_SUBDOMAIN]]-8080-[[KATACODA_HOST]].environments.katacoda.com/dashboard/

You should see a new frontend (rule) and backend - based on the Docker container *code-cafe-echo* added in this step through the Traefik labels. 

Let's try to invoke the new service:
`curl -H Host:echo.code.cafe http://host01`{{execute}}
```
and this to `step4.md`:
```
Now execute this command to stop and tear down all Docker artifacts created before using docker-compose `docker-compose scale code-cafe-machine=3`{{execute}}

Now check the Traefik dashboard - by clicking on the tab labeled *Traefik Dashboard* or by clicking on this link:
 https://[[HOST_SUBDOMAIN]]-8080-[[KATACODA_HOST]].environments.katacoda.com/dashboard/

You should see three servers for the code-cafe-machine backend.

Now try to to invoke the code-cafe-machine service - several times:
`curl -H Host:machine.code.cafe http://host01`{{execute}}

The load balancing act performed by Traefik should result in the requests being routed to different containers in a round robin pattern.
```

Commit and Push to Git. Inspect the result on Katacoda.

Now you could prettify `intro.md` and `finish.md` for good measure.