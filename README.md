NOTE: This project is far from over we can add lot of things to it suggstions are welcome

models: These are nothing but objects which represent the real life entities and they are created using mongoose schema which just maps/links
   the documents in mongodb to the javascript objects.

public :This folder contains all the static files for styling purposes.

routes: In this folder required routes are created for various webpages, REST architecture is used for implementing these routes, ejs templates are used to render the 
     webpages at that particular routes.

views: All those ejs files are stored in views directory in a structured manner.

.env: It is a simple test configuration file used to store your confidential applications environmental constants.Please ensure that you have included this one in your 
     gitignore file

index :This is the file which contains core of your server and where you connect with database it contains various middleware functions and functions to configure 
     the installed dependencies.

seed : This is our prestored data so whenever we want to restart our server we dont need to get the data again you can just insert them with one good click
      using seedDB function

middleware:It will be going to contain useful miidleware functions but now it has only one function which you can pass as callback whenever you want it just checks whether user is logged in
      or not if he is logged next middleware dunction will run otherwise it will redirect to logn page

package.json: It will contain all the dependencies we installed and their versions
               
           Dependency                                for what purpose we have used 
    1.flash-connect                         It is used to create flash messages on the webpages indicating the succes or failure of the task
    
    2.dotenv                                It just helps to create .env files so that we can hide our confiential information like API keys

    3.ejs                                   It is must to work with ejs files 
    
    4.express                               It is basically everything in this project it creates server,handles routing paths much more
    
    5.expess-session                        Express requests are sequential and no request can be linked to each other users cannot be identified , thats what sessions are every user will be allocated a 
                                            unique session this allows you to store the user state.Express-session is used to create sessions.
    
    6.jssha                                 It is used to create a hashing string which is used in payment gateway integration

    7.method-override                       During delete operations we need to send delete method forms which is possible only through method overriding

    8.mongoose                              It is just ODM  used to perform operations in database in accordance with operations happed on server 
    
    9.nodemon                               This package helps us to refresh the server automatically whenever we made achange in code we dont need to update ourselves
   
   10.passport                              This package is used to perform authentication during user login operations.

   11.passport-local                        It is one of the method of passport by which it performs authentication.

   12.uniqid                                As name suggests it is used to genetrate uniq ids which we will use to generate transaction id in payment gateway
 
 