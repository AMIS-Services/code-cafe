# Neo4J Graph Database

TL;DR;
* Graph databases are ideal for query use cases with data with complex relationships and layers of connections
* Its query language is fast, efficient and allows for retrieval of information at deeper levels of abstraction in the data
* Neo4j is currently the most popular Graph database, and its declarative query language is Cypher
* Concepts in Cypher are “nodes”, “relationships”, and “properties” for storing the data

Sometimes an application queries data in a way that does not really work well with regular SQL in a relational model. The query cannot be expressed in a natural, intuitive way and the performance of the query may be orders of magnitude poorer than is acceptable. When the query relies heavily on relationships in a data model and has to make use of many joins, it may well be that a graph database can come to the rescue (as for example E-Bay, Wallmart,  UBS, Airbnb, NASA, Cisco and others have discovered ).

Neo4J is a good example of Graph Databases - open source, easy to get started with, very popular and with plenty of tools and supporting libraries.

## Getting Started with Neo4J

Neo4J will be run in a Docker container and in this simple case we will not map data to volumes outside the container (that means that we do not persist the data in the Neo4J database) 

To start the Neo4J database, simply run:

```
docker run --publish=7474:7474 --publish=7687:7687 neo4j:3.0
```

Now access Neo4J in a browser on the Docker host (or the Windows host) at port 7474, for example: http://192.168.188.142:7474

Connect with neo4j/neo4j. 

You will now be prompted to define a new password. Do so.

Now type in the command window at the top of the page: `:play movie graph`. This loads a sample scenario into the Neo4J Browser.

Click on the right arrow on the right side of the Movie Graph Guide, to move to the next step. Follow the instructions in the guide.

Note: you may need to use `:server connect` followed by login with neo4j/<your new password> before you can start executing Cypher commands.

A small graph database with movies, directors and actors is created. A graphical overview is presented of the data - the nodes and edges clearly visible. The guide will subsequently demonstrate the Cypher command for performing queries against this data set.

## Create a small little graph

CREATE (Bob:Person{name:'Bob'}) -[:FRIEND_OF]->(Jim:Person{name:'Jim'})
CREATE (Lisa:Person{name:'Lisa'}) -[:FRIEND_OF]->(Jim)
CREATE (Marie:Person{name:'Marie'}) -[:FRIEND_OF]->(Lisa)
CREATE (Angela:Person{name:'Angela'}) -[:FRIEND_OF]->(Lisa)
CREATE (Angela) -[:FRIEND_OF]->(Marie)

Now also create the reciprocal relationships (everyone who is friend of someone else will now get someone else as friend as well):
```
MATCH (f1)-[:FRIEND_OF]-> (f2)
MERGE (f2)-[:FRIEND_OF]-> (f1)
```
Who are Bob's friends?
```
MATCH (Bob:Person{name:'Bob'}) -[:FRIEND_OF]-> (f) return f
```
Ahm, that is disappointing. Can we include his indirect friends - 2 or more levels?
```
MATCH (Bob:Person{name:'Bob'}) -[:FRIEND_OF *1..2]-> (f) return f
```

or unlimited levels:
```
MATCH (Bob:Person{name:'Bob'}) -[:FRIEND_OF *1..]-> (f) return f
```

## Employees and Departments , Graph DB Style
The quintessential example of SQL databases is a dataset with EMPloyees and DEPartments. Employees have managers and work in departments, have jobs and salaries. In a small data set with few records, many aspects of SQL can be demonstrated. 

The same applies to Neo4J Graph DB and Cypher. Below you will find a block of Cypher code that creates in Neo4J the nodes and edges that are the equivalent of the EMP and DEPT dataset many developers know from early releases of the Oracle Database. Fourteen employees work in four departments. They all have a manager, except KING who is President and does not need a manager. KING is the topdog, manager of other managers who in turn can manage someone who manages employees (this self referencing relationship can lead to complex queries in SQL and are handled very smoothly in Neo4J) 

```
CREATE (Analyst:Job{name:'ANALYST'})
CREATE (Clerk:Job{name:'CLERK'})
CREATE (Manager:Job{name:'MANAGER'})
CREATE (President:Job{name:'PRESIDENT'})
CREATE (Salesman:Job{name:'SALESMAN'})
CREATE (Accounting:Organization {name:'ACCOUNTING', loc:'NEW YORK'})
CREATE (King:Person             {name:'KING'}) 
CREATE (King)-[:WORKS_IN {job:'PRESIDENT', hiredate:19811117, sal:5000}]->(Accounting),(King)-[:WORKS_AS]->(President)
CREATE (Research:Organization   {name:'RESEARCH'  , loc:'DALLAS'})
CREATE (Sales:Organization      {name:'SALES'     , loc:'CHICAGO'})
CREATE (Operations:Organization {name:'OPERATIONS', loc:'DALLAS'})
CREATE (Clark:Person             {name:'CLARK'}) 
CREATE (Clark)-[:WORKS_IN {job:'MANAGER', hiredate:1980906, sal:2450}]->(Accounting),(Clark)-[:WORKS_AS]->(Manager)
CREATE (Clark)-[:WORKS_FOR]->(King)
CREATE (Blake:Person             {name:'BLAKE'}) 
CREATE (Blake)-[:WORKS_IN {job:'MANAGER', hiredate:19810105, sal:2850}]->(Sales)
CREATE (Blake)-[:WORKS_FOR]->(King),(Blake)-[:WORKS_AS]->(Manager)
CREATE (Jones:Person             {name:'JONES'}) 
CREATE (Jones)-[:WORKS_IN {job:'MANAGER', hiredate:19810204, sal:2850}]->(Research)
CREATE (Jones)-[:WORKS_FOR]->(King),(Jones)-[:WORKS_AS]->(Manager)
CREATE (Scott:Person             {name:'SCOTT'}) 
CREATE (Scott)-[:WORKS_IN {job:'ANALYST', hiredate:19870713, sal:3000}]->(Research)
CREATE (Scott)-[:WORKS_FOR]->(Jones),(Scott)-[:WORKS_AS]->(Analyst)
CREATE ( Ford:Person             {name:'FORD'}) 
CREATE ( Ford)-[:WORKS_IN {job:'ANALYST', hiredate:19810312, sal:3000}]->(Research)
CREATE ( Ford)-[:WORKS_FOR]->(Jones),(Ford)-[:WORKS_AS]->(Analyst)
CREATE (Smith:Person             {name:'SMITH'}) 
CREATE (Smith)-[:WORKS_IN {job:'CLERK'  , hiredate:19801217, sal:800}]->(Research)
CREATE (Smith)-[:WORKS_FOR]->(Ford),(Smith)-[:WORKS_AS]->(Clerk)
CREATE (Allen:Person             {name:'ALLEN'}) 
CREATE (Allen)-[:WORKS_IN {job:'SALESMAN', hiredate:19810221, sal:1250}]->(Sales)
CREATE (Allen)-[:WORKS_FOR]->(Blake),(Allen)-[:WORKS_AS]->(Salesman)
CREATE ( Ward:Person             {name:'WARD'}) 
CREATE ( Ward)-[:WORKS_IN {job:'SALESMAN'  , hiredate:19801222, sal:1250}]->(Sales)
CREATE ( Ward)-[:WORKS_FOR]->(Blake),(Ward)-[:WORKS_AS]->(Salesman)
CREATE (Martin:Person            {name:'MARTIN'}) 
CREATE (Martin)-[:WORKS_IN {job:'SALESMAN', hiredate:19810928, sal:1250}]->(Sales)
CREATE (Martin)-[:WORKS_FOR]->(Blake),(Martin)-[:WORKS_AS]->(Salesman)
CREATE (Turner:Person             {name:'Turner'}) 
CREATE (Turner)-[:WORKS_IN {job:'SALESMAN', hiredate:19810908, sal:1400}]->(Sales)
CREATE (Turner)-[:WORKS_FOR]->(Blake),(Turner)-[:WORKS_AS]->(Salesman)
CREATE (Adams:Person             {name:'ADAMS'}) 
CREATE (Adams)-[:WORKS_IN {job:'CLERK'  , hiredate:19870713, sal:1100}]->(Research)
CREATE (Adams)-[:WORKS_FOR]->(Ford),(Adams)-[:WORKS_AS]->(Clerk)
CREATE (James:Person             {name:'JAMES'}) 
CREATE (James)-[:WORKS_IN {job:'CLERK'  , hiredate:19810312, sal:950}]->(Sales)
CREATE (James)-[:WORKS_FOR]->(Ford),(James)-[:WORKS_AS]->(Clerk)
CREATE (Miller:Person             {name:'MILLER'}) 
CREATE (Miller)-[:WORKS_IN {job:'CLERK' , hiredate:19820123, sal:1300}]->(Accounting)
CREATE (Miller)-[:WORKS_FOR]->(Ford),(Miller)-[:WORKS_AS]->(Clerk)
;
```

Find colleagues of Adams:
```
MATCH (adams:Person{name:'ADAMS'}) - [:WORKS_IN]-> (d) <- [:WORKS_IN] - (p) return p
```
And his colleagues who earn more: 
```
MATCH (adams:Person{name:'ADAMS'}) - [aj:WORKS_IN]-> (d) <- [pj:WORKS_IN] - (p:Person) where aj.sal < pj.sal  return d,p.name, pj.sal
```
Let's give Adams a second job:
```
MATCH (adams:Person{name:'ADAMS'}), (sales:Organization{name:'SALES'})
CREATE (adams)-[:WORKS_IN{job:'ASSISTANT', hiredate:20181312, sal:2100}]-> (sales) 
```
and check again who his colleagues are:
```
MATCH (adams:Person{name:'ADAMS'}) - [:WORKS_IN]-> (d) <- [:WORKS_IN] - (p) return p
```

Now add the department through which they are colleagues:
```
MATCH (adams:Person{name:'ADAMS'}) - [:WORKS_IN]-> (d) <- [:WORKS_IN] - (p) return p,d 
```

And now find colleagues who have the same boss:
```
MATCH (adams:Person{name:'ADAMS'}) - [:WORKS_FOR]-> (boss) <- [:WORKS_FOR] - (p) return p, boss
```
In addition to looking at the immediate boss, we could traverse through [part of] the hierarchy, by adding a classifier on the relationship WORKS_FOR:
```
MATCH (adams:Person{name:'ADAMS'}) - [:WORKS_FOR *1..]-> (boss) <- [:WORKS_FOR ] - (p) return p, boss
```
Here we specificy that we traverse from Adams to his boss, their boss, their boss's boss and so on. And for each of these bosses in the hierarchy we find all employees working for that boss. This is a search approach that is not simple at all to mimick in relational SQL! 

We can limit the number of levels for example to 2 like this:
```
MATCH (adams:Person{name:'ADAMS'}) - [:WORKS_FOR *1..2]-> (boss) <- [:WORKS_FOR ] - (p) return p, boss
```
Note: we can also traverse the hierarchy from the other side - for example find all employees who work for a boss or for a subordinate of that boss or a subordinate of the subordinate etc.:
```
MATCH (adams:Person{name:'ADAMS'}) - [:WORKS_FOR ]-> (boss) <- [:WORKS_FOR *1..] - (p) return p, boss
```
Try with Scott instead of Adams.


##Accessing Neo4J from Node JS 

Node JS

Check file `neo4j-node.js`

Everything related from France:
match (f:Country{name:'France'})- []->(l)   return f,l

Who speaks French?
match (f:Language{name:'French'})<- []-(l) return f,l

Who speaks only French?
match (french:Language{name:'French'}), (c:Country)-[spk:SPEAKS]-> (l) return c, l
where count(spk) = 1 

Who speaks no french - but at least one other language? (more than the French may suspect perhaps)
MATCH (c:Country)-[spk:SPEAKS]-> (l)
WITH c,count(spk)  as rel_cnt, l
WHERE  (l.name <>'French')
RETURN c, sum(rel_cnt);

or:
MATCH (french:Language{name:'French'}),(c:Country)-[spk:SPEAKS]-> (l)
WHERE NOT (c)-->(french)
RETURN c, l;


France's bordering countries who do not speak French
match (french:Language{name:'French'}), (f:Country{name:'France'})- [:BORDERS_WITH]->(bc)-[:SPEAKS]-> (language) 
WHERE NOT (bc)-->(french)
return f,bc, language

Journey from France to Greece with the lowest number of countries in between. And to Zimbabwe?
```
Match path = shortestpath( (f:Country{name:"France"}) –[:BORDERS_WITH *1..6]-(p:Country{name:"Greece"})) return path
```

An to Zimbabwe?
```
Match path = shortestpath( (f:Country{name:"France"}) –[:BORDERS_WITH *1..126]-(p:Country{name:"Zimbabwe"})) return path
```
## Comparing the Graph DB approach with the relational way of working

The challenge discussed here is a Code One Session Recommendation Engine. Conferences such as CodeOne have many sessions to choose from. The challenge of picking the best sessions is a real one. My time is valuable – how do I ensure I do not end up wasting it on sessions by inarticulate or uninspiring speakers?

What I would like to have is an engine that will recommend to me sessions by speakers that are liked by people who attend(ed) the same same sessions that I attend. Surely if people come to the sessions that I attend, then their recommendations for speakers they like must be valuable to me.

Read: https://technology.amis.nl/2018/11/20/building-a-conference-session-recommendation-engine-using-neo4j-graph-database/ for the full story and for details on the relational approach

### relational:

The SQL query I would create to Start from me and the sessions I attended, then Locate other attendees in these sessions and next Find the speakers they like to Finally Retrieve the sessions presented by those speakers looks like this:
```
select s.code
,      s.title
,      a2.attendee_name "suggested by"
from   people p1
       join
       attendance a1
       on (p1.name = a1.attendee_name)
       join attendance a2
       on (a2.session_code = a1.session_code)
       join speaker_liking sl
       on (sl.attendee_name = a2.attendee_name)
       join speakers sp
       on (sl.speaker_name = sp.speaker_name)
       join sessions s
       on (sp.session_code = s.code)
where  p1.name = 'Lucas Jellema'
```

The query is a little longwinded even though I took some shortcuts. In SQL, this particular search challenge that relies heavily on relationships between objects, ends up using many table joins in order to find the right answer. This is not necessarily a bad thing – it is just the way of relational databases and SQL. However, we end up with a query that is not very intuitive to grasp and therefore not super easy to maintain. Furthermore, for really big data sets this approach might not scale well in terms of performance. We can probably employ smart indexing strategies to stretch the approach a little in terms of performance. But we may very well hit limits at some stage.


### GraphDB

Using Neo4J’s Cypher language, I created the vertices and edges in my graph through the Neo4J browser interface. Copy this entire block of code and paste into command section in browser; then press play button:

```
CREATE (lucas:Person{name:'Lucas Jellema'}) – [:PRESENTS] ->(session4976:Session {title:'50 Shades of Data: How, When, Why—Big, Relational, NoSQL, Elastic, Graph, Event', code:'DEV4976'})

CREATE (daniel:Person{name:'Daniel Bryant'}) – [:PRESENTS] ->(session5349:Session {title:'Continuous Delivery with Containers and Java: Lessons Learned and Mistakes Made', code:'DEV5349'})

CREATE (luis:Person{name:'Luis Weir'}) – [:PRESENTS] ->(session4921:Session {title:'The Seven Deadly Sins of API Design', code:'DEV4921'})

CREATE (daniel) - [:PRESENTS] -> (session5283:Session{title:'AdoptOpenJDK: Lessons Learned from the New Build Farm for Java Itself', code:'TUT5283'})

CREATE (adam:Person{name:'Adam Farley'}) 
 
CREATE (adam)-[:PRESENTS]-> (session5283)

CREATE (session4979:Session{title:'Oracle Cloud Soaring: Live Demo of a Poly-Cloud Microservices Implementation ', code:'DEV4979'}) 

CREATE (luis)-[:PRESENTS]-> (session4979)

CREATE (lucas)-[:PRESENTS]-> (session4979)

CREATE (arun:Person{name:'Arun Gupta'}) – [:PRESENTS] ->(session4854:Session {title:'A Day in a Java Developer’s Life, with a Taste of Kubernetes', code:'DEV4854'})

CREATE (luis)-[:ATTENDS]-> (session4854)

CREATE (lucas)-[:ATTENDS]-> (session4854)

// add a new person and attendee in one go
CREATE (session4979) <- [:ATTENDS] - (john:Person{name:'John Millers'})

//Luis likes Daniel Bryant as a speaker
CREATE (luis)-[:VALUES]-> (daniel)
```

Note how objects of type Person and of type Session are created. Notice how Persons get two types of relations to Sessions (PRESENTS and ATTENDS) and how a Person can have a VALUES relation with another Person (indicating that one person values another as a speaker).

With the graph in place, I can create the query that will provide the session recommendations. In Cypher, I can stay very close to the natural language that describes my enquiry. Try the Cypher queries below in the Neo4J browser:

```
// now the hunt is on
//find me and the sessions I attended
match (lucas:Person {name:'Lucas Jellema'}) - [:ATTENDS] -> (s1) RETURN s1
 
// find people who attended the same sessions as ME
match (lucas:Person {name:'Lucas Jellema'}) - [:ATTENDS] -> (s1) <- [:ATTENDS] - (p2) RETURN p2
 
// find presenters valued by the people who attended the same sessions as I did:
match (lucas:Person {name:'Lucas Jellema'}) - [:ATTENDS] -> (s1) <- [:ATTENDS] - (p2) - [:VALUES] -> (p3) RETURN p3
 
// find sessions presented by presenters valued by the people who attended the same sessions as I did:
match (lucas:Person {name:'Lucas Jellema'}) - [:ATTENDS] -> (session1) 
  <- [:ATTENDS] - (recommender) - [:VALUES] -> (speaker) - [:PRESENTS] -> (session) RETURN session, speaker.name, recommender.name
```

Starting with me (vertex of type Person with property name equal to Lucas Jellema), traverse to all sessions that I attended. For these sessions, navigate to all attendees (let’s call them recommenders) and find all speakers that they value. Traverse the PRESENTS edge for all these speakers to get the sessions that they present. Return these sessions, as well as the name of the speaker and the name of the recommender.

## Resources
Introduction to Neo4J - AMIS Blog article by Rosanna Denis: https://technology.amis.nl/2018/11/16/querying-connected-data-in-graph-databases-with-neo4j/ 

Use case demonstrating relational vs graphdb approach - Building a Conference Session Recommendation engine using Neo4J Graph Database https://technology.amis.nl/2018/11/20/building-a-conference-session-recommendation-engine-using-neo4j-graph-database/ 

Cypher Introduction - (Neo4J Docs): https://neo4j.com/developer/cypher-query-language/ 

Cypher Reference Card: https://neo4j.com/docs/cypher-refcard/current/ 

Linkurious Enterprise is an on-premises graph visualization and analysis platform: https://linkurio.us/product/