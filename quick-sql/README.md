# QuickSQL (and LiveSQL)

TL;DR;
QuickSQL is a website that takes very compact yaml files and generates SQL DDL and DML scripts for creating tables with generated demo data, triggers, views, constraints. Using QuickSQL, you can very quickly put together a relational database schema.

You need to have an Oracle user account for using QuickSQL. The LiveSQL site can be used to try out the QuickSQL scripts, create all database objects and experiment with executing SQL queries.

Note: QuickSQL is geared towards Oracle Database; the generated SQL scripts can (probably) be used against PostgreSQL and to some extent with other databases.

URLs:
QuickSQL: http://quicksql.oracle.com
LiveSQL: https://livesql.oracle.com/
 

## Getting Started with QuickSQL

Open the site http://quicksql.oracle.com in your browser. In order to access this site, you are prompted to login with your Oracle account. If you do not have one, you will need to signup and create one. This is free.

Click on `Load Samples` to get a list of QuickSQL yaml File examples. You can easily import each of these examples - and generate the SQL for them. They give a good first idea about the capabilities of QuickSQL as well as the notation in the yaml file. 

Click on Load in Quick SQL for the first Example: Departments and Employees. This will copy the yaml block below to the worksheet, and it will generate the corresponding SQL in the right side window.

```
departments /insert 4
   name /nn
   location
   country
   employees /insert 14
      name /nn vc50
      email /lower
      cost center num
      date hired
      job

view emp_v departments employees
```
If you scroll through the SQL script, you will find not just the DDL statements for the table definitions, but also constraints, triggers to set default values and DML statements to insert generated demo data.

The relevant keywords used in this snippet of yaml:
```
/nn - not null column
/insert 14 - generate 14 rows of demo data
/vc50 - column of type varchar2, 50 characters wide
/lower - Forces column values to lower case (generating trigger logic to do so)
/num - column type is NUMBER
```
Note that Quick SQL reads column names to guess the data type: for example if the column name contains the word `date`, the type is set to DATE. Also note that Quick SQL adds columns for the primary key and generates trigger logic to set the value for this column.

Click on the Syntax button for a full overview of syntax notation to include in the yaml script. An enriched version of the above yaml snippet could look like this:

```
departments /insert 4  /history
   name /nn
   location /index
   country 
   employees /insert 14 /auditcols /select
      name /nn vc50 /unique
      email /lower
      cost center num
      date hired
      job  /upper /values SALESMAN, TRAINER, MANAGER, DEVELOPER

view emp_v departments employees
```
Paste this yaml snippet and press Generate SQL.

Even these few additional annotations make a substantial difference. A history table is created and all DML statements to table DEPARTMENTS are reflected in that table. An index is created for column location. Audit columns and logic to maintain them are generated for table Employees. A unique key constraint is generated on column NAME. The values in JOB are forced for uppercase and in the generated demo data, all values for JOB are randomly taken from the four values specified.

Adding the /api annotation has an additional spectacular effect of generating a PL/SQL Table API. 

###Executing/Trying out Generated SQL - using LiveSQL
If you have an Oracle Database at your disposal, you could easily try out the generated SQL scripts. Even if you do not, you still do. That may sound a little cryptic. The website LiveSQL - https://livesql.oracle.com/ - provides access to personal Oracle Database session. Through the browser interface, you can execute SQL scripts - DDL and DML to create objects and data and Queries to inspect the data. LiveSQL is a neat environment to verify the results from QuickSQL. And in fact, QuickSQL is also embedded in LiveSQL. Note that LiveSQL also offers hundreds of samples of useful SQL syntax and statements that you can reuse of at least use as inspiration.

Navigate to https://livesql.oracle.com/ and login with your Oracle account. 

Click on Start Coding Now.

The SQL Worksheet is opened. Copy the generated code from QuickSQL and paste it into the LiveSQL Worksheet. Then press Run to execute the script. Alternatively, copy the yaml snippet from QuickSQL and paste into the QuickSQL tab in LiveSQL. Then press `Copy to Worksheet`, and press `Run` in the worksheet.

When the script execution is complete, you could press the button `Schema` to get an overview of all database objects in your schema. You can subsequently click on each of these database objects to see more details.

In the SQL Worksheet, you can query the tables and their (generated demo) data. For example:

```
select e.name
,      e.email
,      e.job
,      e.cost_center
,      d.name as department
,      count(*) over (partition by department_id) emp_count_in_department
,      listagg(e.name, ',')  WITHIN GROUP (ORDER BY cost_center)  over (partition by job) colleagues_with_same_job
from   employees e
       left outer join 
       departments d
       on (e.department_id = d.id) 
```
This return a list of all employees, there department, the number of colleagues in the same department and the names of the colleagues who have the same job - all queried from the demo data that QuickSQL generated the DML statements for.

### Publish REST Service based on Generated Table
We could even take this a step further, by publishing a REST API based on the tables for which QuickSQL has just generated the DDL and DML. Oracle provides a third free cloud utility - next to QuickSQL and LiveSQL - called APEX, at https://apex.oracle.com . A result of publishing the REST API can be inspected at: https://apex.oracle.com/pls/apex/ljws/employees/. 
    
To also publish a REST API based on generated tables and demo data, follow along with these steps:

#### Set up APEX Workspace
Open https://apex.oracle.com. Login with your Oracle account.

Request an APEX workspace. Povide a name for the workspace, indicate that you want to use it for a training. Provide your email address. Submit the request.

Usually you will receive an acceptance email within minutes. The email contains a button `Create Workspace`. Click the button to complete the provisioning process. You are taken to a page where you can set your password. 

Login to APEX and to your new workspace. In this workspace you have at your disposal an Oracle Database schema and an ORDS instance (Oracle REST Data Services). In this schema database objects can be created and with ORDS you can publish REST Services based on these database objects. You can also develop a Low Code APEX User Interface Application .

#### Generate Database Objects and Data Records
Go to SQL Workshop. Select `Utilities | Quick SQL` in the dropdown menu. 

Paste the same yaml snippet we used before to the editor in the left hand side of the page. 

```
departments /insert 4  /history
   name /nn
   location /index
   country 
   employees /insert 14 /auditcols /select
      name /nn vc50 /unique
      email /lower
      cost center num
      date hired
      job  /upper /values SALESMAN, TRAINER, MANAGER, DEVELOPER
```
Click on `Generate SQL`. 

Click on Save SQL Script. Provide a name for the script - for example `hr-script`.

Click on Review and Run to create go and create the tables and insert the generated data records. You are taken to the SQL Scripts | Script Editor utility. Here you can tweak the script. Or just execute it, by pressing the Run button.

When the script execution is complete, you can use SQL Workshop | Object Browser to inspect the current contents of the database schema. You can check and edit the table definitions as well as the generated data records.

#### Set Up REST Data Services
Select option SQL Workshop | RESTful Services from the dropdown menu.

Click on the plus icon in the Modules widget, to create a new Module. The module is the container for REST resources. Call the container MyHR and set the Base Path (URI Prefix) to hr. Accept other defaults. Press `Create Module` to submit the module definition.

After the creation of the module is complete the page is refreshed. You can scroll down the page and find the button `Create Template`. Press the button to create a template for the Employee resource. Enter the value `employees` for URI Template and accept other defaults. Press `Apply Changes` to save the changes. Note that a full URL is shown - something similar to https://apex.oracle.com/pls/apex/<your workspace>/hr/employees.

Click on `Create Handler` to create a handler for a simple GET request. Select the defaults of Method (GET) and Source Type (specify type )Collection Query). In the Source area, paste the following SQL Query:
```
select * from employees
``` 
Click on `Create Handler`.  

At this point, when all actions were successfully completed, your REST API is live, at the URL shown for the Template. Copy the full URL to your browser's location field and press enter. You should see the JSON representation of the generated demo data returned by the SQL Query that you pasted in the Handler's source field.

The Template can be extended with handlers that take query parameters, support various types of pagination and of course handlers for POST, DELETE, PUT and other HTTP methods to not only publish data but also manipulate data. 

An example of a Resource Template that implements the ability to retrieve a specific employee’s details by passing in the employee id: the Resource Templates URI Pattern looks like `employees/:id`. A Resource Handler is implemented using the GET operation and the following logic:
```
select id, name, job from employees where id = :id 
```
When calling the RESTful service, access the service using the server path, base path and URI template and providing a static value for the employee id as: `http://apex.oracle.com<your workspace>/hr/employees/<id>`

When this particular URL is called using an HTTP GET, the service returns the result of the SQL Statement listed above. The format in which the data is returned depends upon the full definition of the Resource Handler.

## Resources

Blog Article: Rapid generation of Oracle DDL scripts for Tables, PL/SQL APIs, Sample Data https://technology.amis.nl/2018/10/21/rapid-generation-of-oracle-ddl-scripts-for-tables-pl-sql-apis-sample-data/