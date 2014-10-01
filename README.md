YeoMEAN GPA Calculator
======================

YeoMEAN is a Yeoman based, generator-angular-fullstack project created by Brian. This project includes quite a bit of automatically generated structure and template files. For this lab, your main goal is to build a GPA calculator that stores courses in a Mongo database and displays the overall GPA. You will want to spend some time browsing around the project with your partner once you fork the project and get the dependencies all set up. Good news! The project inculdes a couple tests to show you examples of ways to test your project.

## Dependencies to run:

You will need to have some global dependencies installed. These should be installed, if not, have Brian run these as root for you:

```sh
$ npm install -g yo && npm install -g grunt && npm install -g generator-angular-fullstack
```

To use yo generators, see [https://github.com/DaftMonk/generator-angular-fullstack](https://github.com/DaftMonk/generator-angular-fullstack)

For example, running ```yo angular-fullstack:route testing``` from a terminal will generate a page titled 'testing'.

Use a route to add a new page. This generates an HTML, CSS, controller, javascript file, and test template for the page you want to add. It also links in all of these files for you. Use this to generate the page for your GPA calculator (don't copy your existing files (or if you do, don't ask for help :P)).

Use the endpoint generator to add a new database (similar to Brian's movies database).

## To Develop

Run ```grunt serve``` to start node and run the web application on [http://localhost:9000](http://localhost:9000). (The page will be opened automatically by grunt)

To run tests, run ```grunt test```.

## To Setup Mongo Plugin in WebStorm

* Go to File > Settings
* Then navigate to Plugins
* Search for "Mongo" and install "Mongo PLugin" (this will require WebStorm to be restarted)
* Once WebStorm is re-opened, there will be a Mongo Explorer tab on the righthand side of the window.
* Open the tab and click the gear and wrench icon (when hovered over, it says "Mongo Settings").
* Enter in "/usr/bin/mongo" to the path of the Mongo executable and click test.
* In the same settings menu, click the green "+" and add the database "yeoman-dev" and label it the same.

To use the plugin, open the Mongo Explorer tab and right click on the yeomean-dev server and choose "refresh this server". You can then double click on your dabatase and view its contents.

Play around with Mongo and this plugin, it's super helpful!

## What you should aim to accomplish

Re-implement the GPA calculator, but this time add the following features:
* Store the student's grades in the Mongo database.
* Display the course titles along with the number of credits and earned grades as an editable form. When the form is edited, the GPA gets recalculated.
* Add a button to add more courses. (This was not required last time, though I realize many of you did add such a button.)
* Edit the CSS so that the page looks different from the initial project you forked.

Along the way, *add at least two tests*. This week, I think you should be able to get some tests working. Use the example tests in the /client/app/umm/umm.controller.spec.js file as a guide. You should use Mongoose to create schemas as needed. Whenever you generate a new page, be sure to use the instructions above for adding a new route so that the appropriate things are created for you.

Update your README to include the following documentation that would help someone understand your project:
* What are some of the dependencies of the project (i.e. which libraries does it depend on)? Hint: dependencies are in .json files. Look up four libraries and briefly explain what they each do.
    Express - A Node.js web application framework that provides features for web applications.
    Morgan - An http request logger middleware for Node.js.
    Mongoose - A MongoDB object modeling tool designed to work in an asynchronous environment.
    Grunt - The JavaScript task runner.

* What is the structure of the project? What is the purpose of each folder?
    The structure of the project is several folders that separate the views from models and the whatever ;)
    The API course folder contains the functions for accessing and modifying the database and the routing instructions.
    The app/umm folder contains the view and functions pertaining to the GPA calculations.

* What are models? Where are they located? What does the current model describe?
    A model is the back end of the application and handles the functionality that a user doesn't deal with directly. In this case, they are located in the server folder.
    The current model describes a database that stores course information that is crucial to GPA calculation.

* What are views? Where are they located? What is a layout? What is a partial? Identify places where a layout renders partials.
    A view is the front end of an application that contains content that a user directly interacts with such as features. In this case, they are located in the app folder.
    A layout is the "default" structure of the view. A partial is a more detailed structure that is displayed within a layout at certain times. In our project, the different
        courses make up the partial whereas the list of courses is defined by the layout.

* schemas describe mongodb database schemas. What schema does your project have? What gets stored in the database?
    We have courseSchema. An object containing a title, grade, and credit value is stored within it.

* What are routes? Open the route. Explain how each type of request gets processed. How does the resulting page change? How does the data in the database change?
    They are directions for how to process requests pertaining to files in other locations.
    The request is received and referenced to the routes where it is then sent on to the relevant location.
    

* Explain how the result GPA result is calculated and how it gets rendered on the page.
    The GPA is calculated by taking the grade and changes it to the "grade point" where it then is multiplied by the credit for the course. Then summing all these values for all of the courses and then dividing that total by the total number of credits. This is rendered by Angular two-way data-binding that calls our GPA calculation.

