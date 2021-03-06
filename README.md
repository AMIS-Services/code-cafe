# Code Cafe
The Code Café is a series of low key, relaxed meetups where we explore various technologies, tools, programming aids and other fun stuff in a relaxed setting. This repository contains artifacts for the Code Café sessions.

Note: in the Code Café, we can work with various technologies - browser based or local (typically in containers) - and across the stack: UI, (micro)service, database, code editing and programming utilities and general productivity boosters. 

Code Café sessions will usually not work with slides and presentations. Items are introduced with a brief introduction and a demonstration - followed by trying out!

## Git Repository
Initially, a single Code Cafe Repository was used on GitHub. However, that becomes unwieldy. So now we use GitHub repos per Code Cafe session, and we link these individual session repos as sub modules to this overarching Code Cafe repo.

I use the command
```
git submodule add https://github.com/AMIS-Services/code-cafe-20190520
```
to add a repo as a submodule. After executing this command, the *.gitmodules* file is committed for the mother-repo. All sources and changes for a specific Code Cafe session are made in the context of the GitHub repo for that particular session.  

See for example this article with details on submodules: https://github.blog/2016-02-01-working-with-submodules/ .

## On the menu of earlier Code Café sessions

### 2019

#### 20 May 
* Laptop as Code – Nico Klasens
* Quickstart - Je Container de Azure Cloud in – Henk Jan van Wijk
* Recharts - charting in React – Bram Kaashoek
* Asynchronous Generators en Data Pipelines in JavaScript – Lucas Jellema

#### 2 April
* LastPass - https://www.lastpass.com/ LastPass remembers all your passwords, so you don't have to.
* Kafka Connect
* Adobe XD - design tool for web and mobile apps - https://www.adobe.com/products/xd.html 
* Node Red
* Kibana 

#### 31 January
* Traefik - Load Balancer and Proxy ("Cloud Native Edge Router") https://traefik.io/~
* Powershell
* ZSH and OhMyZSH - https://ohmyz.sh/  Linux Shell 
* Katacoda - browser based sandboxes and tutorials environment (with the option of defining your own tutorials running on Katacoda servers)
* Cypress Testing - automated unit testing of browser applications (Selenium++): https://www.cypress.io/ 

### 2018

#### 13 December
*  ngrok (& local tunnel) for exposing locally running services on the internet
*  JSONata - XPath & XSLT/XQuery like expression language for retrieving data from and transforming JSON documents
*  Vagrant (& VirtualBox) - tool for efficient management of VMs and a local Docker Engine); especially useful for running Docker on Windows laptops
*  QuickSQL - free cloud service for rapid generation of SQL DDL and DML scripts for tables, generated test data, constraints, views, triggers and APIs
* Neo4j - open source Graph Database


## Planned for the upcoming Code Cafe - May 20th 2019
* AWS?
* APEX?

## Possible Topics on the Menu of the Code Café
* ArrangoDB - multimodel store, somewhat similar to MongoDB; newer, less mature, much nicer UI, good geo support (with ui openstreetmap integration). tip from Thijs van Ulden - https://www.arangodb.com/
* BigQuery - Google Column Store - 
* p5.js a JS client-side library for creating graphic and interactive experiences, based on the core principles of Processing. - https://p5js.org/ 
* Google Container Diff - utility to compare two container images and find differences
* Skaffold - command line tool that facilitates continuous development for Kubernetes applications
* Oracle Self Service Integration - cloud service for specifying and running (poll based) integration recipes
* GraphQL - Apollo - alternative for REST APIs
* WebSpeech API - speech to text support in HTML5 browsers
* Apache Drill - SQL on non-SQL sources such as JSON, CSV, Hadoop 
* Apache Camel - light weight Java based integration framework
* Syndesis - UI for Camel
* Oracle SQL Pattern Matching (Match Recognize)
* Terraform
* JShell - REPL CLI for Java
* LiveSQL - browser based environment for experimenting with (Oracle) SQL
* Google ContainerTools - collection of open source tools from Google for container and K8S development and management
* KubeApps - Helm based deployments of dozens of (complex) applications and stacks onto Kubernetes cluster
* Dash -  Documentation Browser and Code Snippet Manager. Dash stores snippets of code and instantly searches offline documentation sets for 200+ APIs, 100+ cheat sheets and more https://kapeli.com/dash (MacOS and iOS)
* Silver Searcher - source code search utility (https://github.com/ggreer/the_silver_searcher)
* OneNote (Office 365)
* Wappalyzer - a Chrome extension that lets you visit any webpage and see what stack was used to build it
* CloudFlare - CDN, WebApp Firefall, ...
* Elastic Stack for Logging/Monitoring: Beads, LogStash, Elastic Index, Kibana
* ASCIIDoctor - Asciidoctor (https://asciidoctor.org/) is a text processor and publishing toolchain that converts AsciiDoc files into HTML5, PDF, EPUB, and MOBI.
* Graal VM - create polyglot applications - for example Java application that can call Node JS/JavaScript and Python libraries or Node application that hooks into Java based logic
* Browser Developer tools - Console, Debug, Traffic Inspector, ...
* How to create a Chrome Browser plugin
* CodeWars - to train developer coding skills: https://www.codewars.com/ 
* RPA - quick introduction to Robotic Process Automation
* CodePen (of JSFiddle) - browser based environment to try out (and share) samples/code snippets (HTML + CSS + JS)
* JSONFormatter - https://chrome.google.com/webstore/detail/json-formatter/bcjindcccaagfpapjjmafapmmgkkhgoa?hl=en Chrome Extension for formatting and syntax highlighting JSON documents (loads documents from URL)
* Google VisBug Chrome Extension: https://chrome.google.com/webstore/detail/visbug/cdockenadnadldjbbgcallicgledbeoc "Give power to designers & content creators, in a place where they currently feel they have little to none, by bringing design tool interactions and hotkeys to the browser"
* Beacon Web API - https://developer.mozilla.org/en-US/docs/Web/API/Beacon_API - Introduction on use cases: https://www.smashingmagazine.com/2018/07/logging-activity-web-beacon-api/ 
* NASA APIs - https://api.nasa.gov/ 
* Web API for Blue Tooth (from Desktop/Tablet Browser) - https://developers.google.com/web/updates/2015/07/interact-with-ble-devices-on-the-web
* Browser Push API - https://developers.google.com/web/fundamentals/push-notifications/ 
* Browser Shape Detection API - https://medium.com/@eyevinntechnology/using-shape-detection-api-in-chrome-to-detect-if-anyone-is-watching-the-video-f3f898d2912 
* Browser Geofencing API - https://developers.google.com/location-context/geofencing/ 
* Browser Web Share API - https://hackernoon.com/web-share-api-the-coolest-but-simple-e3bb7ec9bb02 , https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share and Web Share Target API: https://developers.google.com/web/updates/2018/12/web-share-target  (currently only Chrome?)
* Voice enabled Web Application using AWS Lex API (to interpret audio input) - https://aws.amazon.com/blogs/machine-learning/capturing-voice-input-in-a-browser/    
* Jupyter Notebooks for Data Gathering, Exploration, Visualization, Wrangling (Filtering, Conversion, Transformation, Enrichment) and Analysis: To run Jupyter Notebook in container: https://jupyter-docker-stacks.readthedocs.io/en/latest/using/selecting.html#jupyter-scipy-notebook ; run live notebooks online based on GitHub repo: https://mybinder.org/ 
* Rechart - React UI library based on d3.js for charts in React applications
* AWS AppSync - Cloud service for implementing a GraphQL server
* HotJar - client side monitoring and user action tracking - https://www.hotjar.com/home2 
* KOA - NPM/Node alternative for Express - https://koajs.com/ 
* GitLab - DevOps lifecycle platform - https://about.gitlab.com/ 
* Code Analysis - Java Dynamic & Static Callgraph: https://github.com/gousiosg/java-callgraph , Ioh - Node Dynamic Node Call Analysis   https://github.com/maierfelix/Iroh
* MicroK8S - https://microk8s.io/?utm_source=MOTD&utm_medium=MOTD&utm_campaign=1)FY19_Cloud_K8
* Aciinema - https://asciinema.org/ Free Terminal Recording software (including copy & paste from recordings )
* LogRocket - client side log consolidation and analysis - learn what your users are doing in their browsers https://logrocket.com/signup/ (LogRocket is a frontend logging tool that lets you replay problems as if they happened in your own browser. Instead of guessing why errors happen, or asking users for screenshots and log dumps, LogRocket lets you replay the session to quickly understand what went wrong.)
* Read the Docs - https://readthedocs.org/ open platform for creating, managing, publishing software documentation 
* Mark down editor - online or local: MDE https://simplemde.com/ and local: MarkDownPad - https://markdownpad.com/ 
* Self service integration - Microsoft Flow, Oracle Self Service Integration, IFTTT, Zapier (https://zapier.com/) 

* Imgur - Image sharing/manipulation (animated GIF generation) - https://imgur.com/vidgif
* LetsEncrypt - Let’s Encrypt is a free, automated, and open Certificate Authority. https://letsencrypt.org/
* JSONPath and/or JMESPath - JSON querying (and light weight transformation with JMESPath) - (https://goessner.net/articles/JsonPath/) in many client libraries/languages including Java and Node JS- https://github.com/json-path/JsonPath, Online JSON Path Evaluator http://jsonpath.com/; introduction to JSONPath: https://www.baeldung.com/guide-to-jayway-jsonpath ; NPM Package: https://www.npmjs.com/package/jsonpath 
* OpenVAS - http://www.openvas.org/ - a full-featured vulnerability scanner. OpenVAS is available as packages in multiple Linux distros, in source code form, and as a virtual appliance that can be loaded into a VM on Windows. It is also part of Kali Linux.
* mitmproxy - https://mitmproxy.org/ is a free and open source interactive HTTPS proxy. 
* Kialia - Service Mesh Observability (friends of Istio) https://www.kiali.io/
* Apache Nifi - Real Time High Volume Data Flows to process and distribute data -  https://nifi.apache.org/  
* FluentD - Logging collector, similar to LogStash/Beats in Elastic Stack; also used with Elastic and Kibana; part of CNCF, frequently used in Kubernetes - https://www.fluentd.org/ 
* Kayenta - automated Canarary release analysis (integrated with Spinnaker)  - https://cloud.google.com/blog/products/gcp/introducing-kayenta-an-open-automated-canary-analysis-tool-from-google-and-netflix
* Spinnaker - Release Management (some overlap with Jenkins, GitLab) - https://www.spinnaker.io/concepts/ 
* Zipkin - collect trace information across end to end chains of processing requests - great to use with microservices and multilayered APIs - https://zipkin.io
* ExpressGateway - lightweight all Node API Gateway - https://www.express-gateway.io/ (alternative to Kong, Apigee, Tyk)
* CircleCI - Automated Continuous Integration (cloud service) - https://circleci.com/
* Gatling - load testing tool, alternative for JMeter (looks attractive) - https://gatling.io/  
* DuckDNS - free Dynamic DNS service (get a fixed URL that is mapped to an IP address that you can change at any moment )  https://www.duckdns.org 
* StreamSets - data integration engine for flowing data - https://streamsets.com/products/dataops-platform
* Debezium - to turn database change events into Kafka messages - https://debezium.io (now including Oracle Databade connector - using XStreams which requires Golden Gate license)
* RethinkDB - https://www.rethinkdb.com/ - database pushing JSON to apps (leverage socket.io)
* Storyline  http://storyline.knightlab.com/ , StoryMap - https://storymap.knightlab.com/ 
* Microcks - http://microcks.github.io/ - mock implementations for APIs/microservices
* Apicurio.io - https://www.apicur.io/ - API design and publication (similar to Swagger and Apiary)
* Axon Framework and Server - https://axoniq.io/ - event driven microservices in Java
* ZeroMQ - http://zeromq.org/ Distributed messaging
* NPM Axon - https://www.npmjs.com/package/axon message-oriented socket library for node.js heavily inspired by zeromq 
* Rabbit MQ -  https://www.rabbitmq.com/ open source message broker, lightweight and easy to deploy on premises and in the cloud. It supports multiple messaging protocols. RabbitMQ can be deployed in distributed and federated configurations to meet high-scale, high-availability requirements. 
* Nakadi https://github.com/zalando/nakadi /https://nakadi.io/  - Zalando's distributed event bus that implements a RESTful API abstraction on top of Kafka-like queues ; alternative to Confluent Platform (and perhaps Axual as well); it has "timelines" that allows moving Topics between Clusters in a smart way (see https://archive.fosdem.org/2018/schedule/event/nakadi/)It also allows combining different "sequential logs" backends (Kafka and others) under the covers
* Keda - Kubernetes Event Driven Autoscaling (https://github.com/kedacore/keda) - Adding and Removing Pods for example based on how full an event queue becomes (or based on HTTP request rate); hieraan gerelateerd: Osiris (https://github.com/deislabs/osiris) - scale K8S deployments based on HTTP traffic
* Virtual Kubelet - (https://github.com/virtual-kubelet/virtual-kubelet) Add Nodes to K8S cluster that are backed by other APIs/services than the standard K8S Kubelet (e.g. HashiCorp Nomad, AWS FarGate, ...)
* Fluid Framework - Microsoft Web Framework om Office 365 te integreren in maatwerk web applicaties en om UI componenten te implementeren die live synchronisatie doen over meerdere gebruikerssessies heen (net als in Office365 Word of Google Docs) - zie bijvoorbeeld: https://www.theverge.com/2019/5/6/18530191/microsoft-fluid-framework-productive-collaborative-web-technology-build-2019 NB In mei 2019 is Fluid nog niet publiek beschikbaar
* Apache AirFlow - Apache Airflow ( https://airflow.apache.org/ ) om (data processing) workflows/tasks te coördineren.
* Hawt.io - https://hawt.io/ - A modular web console for managing your Java stuff (among others UI console for JVM behavior and GUI for Apache Camel, Active MQ, Sping Boot;JVM: diagnostics, logs, JMX, threads etc.)
* SonarQube - https://www.sonarqube.org/ - tool for Code Quality and Security Analysis for over 25 programming languages, easily integrated into Jenkins pipelines ; cloud service: https://sonarcloud.io/about 
* Sublime Merge - https://www.sublimemerge.com/ - Git UI Client - A snappy UI, three-way merge tool,
side-by-side diffs, syntax highlighting, and more.
* IntelliJ IDEA - https://www.jetbrains.com/idea/ - Community Edition (JVM development - Java, Kotlin, Scala, Android)
* Podman - daemonless alternative to Docker for building and running containers - https://medium.com/@ganeshmani009/replacing-docker-with-podman-power-of-podman-cloudnweb-23cfb7541538 , https://github.com/containers/libpod , https://podman.io/ 
* dependabot.com -  https://dependabot.com - een gratis dienst die de dependencies van je software inspecteert en je op de hoogte brengt als je outdated of insecure dependencies hebt.
* AutoHotKey - light weight RPA/Windows Scripting associated with HotKeys - https://www.autohotkey.com/

* k3S - light weight Kubernetes Cluster on Linux Host (similar to Minikube but much much smaller) - see https://technology.amis.nl/2019/11/12/ultra-fast-ultra-small-kubernetes-on-linux-k3s-beating-minikube/

* DeckDeck Go – https://deckdeckgo.com/ Presentation Editor

* Karate (DSL) https://github.com/intuit/karate – open-source tool to combine API test-automation, mocks and performance-testing into a single, unified framework

* Kind – Kubernetes in Docker- https://github.com/kubernetes-sigs/kind

* nip.io – Dead simple wildcard DNS for any IP Address; allows you to do that by mapping any IP Address to a hostname

* lvh.me

* Dive – inspecting and comparing Container Image (layers) – https://github.com/wagoodman/dive

* Newman – programmatic execution of Postman Test Collections

* WireMock is a simulator for HTTP-based APIs (http://wiremock.org/)

* http://rest-assured.io/ – testing REST APIs from java

* GitBook

* JDeferred – https://github.com/jdeferred/jdeferred – Java Deferred/Promise library similar to JQuery.

* Testcontainers – Java gebaseerd programmatisch starten en manipuleren van containers op local or remote docker host

* QuickPerf – extension of JUnit – voor testen van performance gerelateerde applicatie-aspecten (in een heel vroeg stadium)

* Jbi – smart container image generation voor Java applicaties; ook : Skaffold (Container Pipeline), Helm (deployment van K8S applicaties) en Kustomization (omgevingspecifieke overrides van K8S yaml files)

* Google Cloud Run – very simple ‘run my container’ service

* Buildpacks – Buildpacks build apps in a consistent, repeatable way. Buildpacks know what a specific application type needs in terms of its runtime. The big idea behind buildpacks? Building containers from source code should be completely automated.

* Microbenchmarking the JVM:  https://openjdk.java.net/projects/code-tools/jmh/  (see https://www.youtube.com/watch?v=5AFgNuGwLos for a session that includes a demo)

* Jest – JavaScript testing – https://jestjs.io/ 

* Chai is a BDD / TDD assertion library for node and the browser that can be delightfully paired with any javascript testing framework. – https://www.chaijs.com/

* Apache Beam – data pipeline coordination

* ArrangoDB – multi model database

* Fairing

* Storybook – https://storybook.js.org/ – Storybook is an open source tool for developing UI components in isolation for React, Vue, and Angular. It makes building stunning UIs organized and efficient.

* Portecle – is a user friendly GUI application for creating, managing and examining keystores, keys, certificates, certificate requests, certificate revocation lists and more – http://portecle.sourceforge.net/ (that is HTTP not HTTPS)

* OpenSSL – OpenSSL is a robust, commercial-grade, and full-featured toolkit for the Transport Layer Security (TLS) and Secure Sockets Layer (SSL) protocols. It is also a general-purpose cryptography library. – https://www.openssl.org/

* NMap – https://nmap.org/ Nmap (“Network Mapper”) is a free and open source (license) utility for network discovery and security auditing. It was even featured in twelve movies, including The Matrix Reloaded, Die Hard 4, Girl With the Dragon Tattoo, and The Bourne Ultimatum.

* GopherJS – browser playground for Go(Lang) – and: transpile Go application to JavaScript – https://github.com/gopherjs/gopherjs 
* qgrid - widget for Jupyter Notebook - An interactive grid for sorting, filtering, and editing DataFrames in Jupyter notebooks - https://github.com/quantopian/qgrid
* Dash - Awesome API documentation browser and code snippet manager. https://kapeli.com/dash (on Mac)
* Studio 3T - MongoDB IDE Easy IDE for manager and it is free for MongoDB https://studio3t.com/
* DBeaver - Universal SQL Client such as MYSQL, Postgres, etc https://dbeaver.io/
* GitKraken The most popular Git GUI for Windows, Mac and Linux. https://www.gitkraken.com/
* StarUML3 All-in-one UML, SysML, BPMN Modeling Platform for Agile, EA TOGAF ADM Process Management. http://staruml.io/
* DirectPoll - live polls in presentations and Team Meetings - https://directpoll.com/
* Insomnia - The most intuitive cross-platform REST API Client. https://insomnia.rest/
* AWS Cloud9 IDE is a 100 percent online editor which combines online editing with a Docker UBUNTU workspace. Source: https://www.webbuildersguide.com/website-builder-articles/top-10-software-development-tools/ - part of AWS free tier
* Habitica, an open-source habit building program that treats your life like a Role Playing Game. - iTunes App Store, Google Play and https://habitica.com/static/home 
* musicForPrograming - The musicforProgramming website is an interesting concept for a music generator meant to increase productivity. Its interface mimics a code editor; when going to the page to change the track, you’ll be more likely to keep focus on your coding activities, because you’ll visually link this website with your work.
* Clockify - time you spend on various programming activities is vital, and there is no better way to do this than turning to efficient and free time tracking software. https://clockify.me/developer-time-tracking
* F.lux is a cross-platform that adjusts the color temperature of your display, to help your eyes rest, and ensure you can work on your programming tasks in a quality way, longer.
* Soundtrack.net - This website is a great resource for soundtracks you can listen to while programming, and it offers a large number of game soundtracks. It also offers an extensive list of movie and TV show soundtracks (about 30,000 titles in total), and you can listen to music from newly released trailers and teasers.
* MantisBT - Mantis is a web-based bug tracking system. It’s main use is to track software defects and report them, but you can configure it so that it works like a project management tool and issue tracking system.
* Focusmate - If you’re a freelance developer worried that you’re prone to procrastinating during the time periods when you should be coding, you can try Focusmate. This is a coworking virtual community, where you get assigned with a partner who makes sure you focus on your tasks.
* AutoHotKey - If you’re a Windows user, you can turn to AutoHotKey, a scripting language that helps automate recurring actions you have to undertake in Windows applications. RPA on your laptop. 
* Codeanywhere - a code editor that allows developers to code together in real-time, and finish more in less time. With this code editor, you can work directly in your browser. Just invite your collaborators, by sending them an URL link of the project; you can determine the level of permissions for each team member, and invite as many programmers as you want
* RescueTime is more for tracking personal productivity. It’s an automatic time tracker that measures how much time you spend on various software and websites, without you having to click anything. As such, its perfect if you’re interested in how, for how long, and on what websites you procrastinate.
* 

