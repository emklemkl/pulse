# pulse
Project Pulse.<br>
I have included a prepopulated database dump named pulse.sql including all stored procedures. Below is a get started guide. 
The reason the user dbadm is needed is because some of the procedures are locked to that user. The guide below is successfully tested in a docker container. Unfortunately 
I didnt have time to put the entire project in Docker images. 
<br><br>
Step 1: Create a user named "dbadm" (without quotes) in Mariadb Example: MariaDB [(none)]> CREATE USER dbadm IDENTIFIED BY 'P@ssw0rd'; <br><br>
Step 2: Grant dbadm permissions Example: MariaDB [(none)]> GRANT ALL PRIVILEGES ON *.* TO dbadm IDENTIFIED BY 'password';<br><br>
Step 3: FLUSH PRIVILEGES; This might be OPTIONAL as it was not needed in some of my trials.<br><br>
Step 4: update the config file ./project-pulse/server/config/db/pulse.json. Get hostname in linux by typing hostname in terminal. Example hostname <LAPTOP-9H0JTS05.local><br>
{<br>
    "host":     "your hostname", <br>
    "user":     "dbadm",<br>
    "password": "Your mariadb pw",<br>
    "database": "pulse",<br>
    "multipleStatements" : true<br>
} <br><br>

If the above steps seem like to much hassle and you dont mind an 'almost empty' database you can just run the reset.sql file and create your own databse with your own user. 
You will probably still need to update the ./project-pulse/server/config/db/pulse.json file to match your database, similar to Step 4. No matter how you 
decide to start the application <b>the database will always be populated with at least an Admin Account named Admin and with the preset password "test" (is encrypted)</b>. At the current stage of the 
application the "test" password is not changeable through the UI. All pre added and newly added (with csv) have the default password "test"<br><br>

I also included a CSV file containing made up employees for easy testing. If you want to test the automated mail functions (choose new pw on register or reminder mails for reports) you need to change 
the mail of one of the employees in the CSV file to a valid email. Be wary that the csv file need to be in extactly the provided format in order to be usable. Also if you add the same employee twice (is 
compared with existing SSN) the server will crash, in other words you cant add duplicate employees, but if you try the server need 2 restart.
<br><br>
Step 5: In order to start the application you can simply run node server.js in ./project-pulse/server AND ./start.bash (or bash start.bash) in ./project-pulse/frontend. The app will then be available on localhost:9000
