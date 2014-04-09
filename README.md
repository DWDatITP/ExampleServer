Example Node Server
=============

Setup:
  * Install nodemon:
  * `npm install -g nodemon`

To run this server:

  * `nodemon server.js`
  * Visit http://localhost:5000/

To view the server in action:

  * Visit http://frozen-plains-7894.herokuapp.com/


## Set up express!

Install express. Make sure you're in your web directory, and then type:

`npm install --save express`

The `--save` part means that npm will add the dependency "express" to your package.json.
After you run the command, open up your package.json and make sure you see a line that says
something like `"express": "^3.5.1"` (your version number might be different than 3.5.1, that's ok).

### Change your app to use express

Before this, we were using node's built-in `http` module for creating our server by typing:

`var http = require('http');`

This time, we'll use express instead. You can require `'express'` like so:

`var express = require('express');`

We can now simplify our app a lot. First, remove the existing code that was there to read files from disk. Express will give us a way to do that much more easily, which we'll get to in a moment.

First, though, we'll set up our express app:

```javascript
var express = require('express');
var app = express();
var port = Number(process.env.PORT || 5000);
app.listen(port);
```

This sets our app up to listen on port 5000 but it doesn't do anything, yet.
We can define a route like so. Add this code _after_ you the `var app = express();` line.

```javascript
app.get('/', function(request, response){
	response.send('Hello, World');
});
```

You might have noticed that the anonymous function passed in as the second argument looks like the same one we used when we were using the `http` module directly. It _is_ very similar, but when we are using express, express gives us some additional functionality, such as the `send` method to the `response`, which wasn't available before when we used the `http` module. The full list of available options for the "response" argument are at the [express API docs](http://expressjs.com/3x/api.html#res.status).

You'll also notice that here in express we use the method `get` on our app and provide it with a url and a callback. The code above adds the "/" (root) url. How would you change it to add another route for, say, the "/about" url?

After you add this, visit [http://localhost:5000](http://localhost:5000) in your browser. (Make sure you are running the app, first: `nodemon server.js`.)

You should see our familiar friend, "Hello World". (The full code so far is available [at github](https://gist.github.com/bantic/10216848)).

### Configure express to serve static files

Express has a built-in helper to serve up your static files (like your css and javascript) called `express.static()`. To configure your app to serve up the static files that are in your, add this line:

`app.use('/public', express.static('public'));`

This tells the app to serve up the files in the 'public' directory at the base url "/public".
So if you have an "app.css" file in your "public" directory, it will be available at [http://localhost:5000/public/app.css](http://localhost:5000/public/app.css).

The `use` method is something else that we get with express. It's not important to understand it fully, but for now just know that it allows us to modify express's default behavior and insert some additional functionality before express responds to a route. This is called "middleware" and if you'd like to know some more, here are some resources online:

  * [Connect Middleware Guide](http://stephensugden.com/middleware_guide/)
  * [StackOverflow Question](http://stackoverflow.com/questions/5284340/what-is-node-js-connect-express-and-middleware)

### Serving images

Bonus! Now that we have express set up to serve static files, we can also serve up static _images_! This would have been hard to do before when we were using `fs.readFile` because images are typically much larger than simple text files, but this is now easy to do with `express.static()`. Try adding a gif, png or jpg file to your public directory and viewing it in your browser. For example, if you have a gif called "happy.gif" and you put it in inside a directory called "images" inside your "public" directory, then you can see it at [http://localhost:5000/public/images/happy.gif](http://localhost:5000/public/images/happy.gif). Excellent!


### Configuring a templating engine

So far we've built servers that serve up static files brilliantly, but the web wouldn't be all that it is today if it could only serve up static files. We'll use a "templating engine" to allow us to change the HTML files that we send back to our users.

A "templating engine" is a fancy term for a piece of software that takes information that you provide to it, and inserts that information into a larger document such as an HTML file. For instance, if you had a string that looked like this: "Hello {{yourNameHere}}", and you replaced the part in curly braces with a variable called `yourNameHere` which equaled "World", you'd end up with the string "Hello World". This is essentially what a templating engine does.

The teplating engine we will use in class is: [handlebars](http://handlebarsjs.com/). We'll use an npm module designed to make using handlebars with express easy, called `express3-handlebars` (the "3" is because it is designed for express version 3.0 and later).

Back in your terminal, exit your running server if it is running, and install the node module:

`npm install --save express3-handlebars`

Don't forget the `--save`. It notifies npm to update your package.json and add an explicit dependency on `express3-handlebars`. If you forget this now you won't notice anything awry, but it will cause problems later when you deploy your app to heroku.

Now that we have installed the express handlebars module, we need to modify our code to make use of it.

At the top of your server.js file, require the `express3-handlebars` and store it in a variable:

`var expressHandlebars = require('express3-handlebars');`

Create an instance of the expressHandlebars variable and store it also in a variable:

`var handlebars = expressHandlebars.create();`

Now we need to configure our application to use handlebars for its templating engine. We need to set the property `'view engine'` (a templating engine is also sometimes called a 'view engine') on our app, and also tell the app which engine to use. After the line where you've created your app, add these two lines:

```javascript
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
```

Finally, modify your anonymous callback function so that instead of calling `response.send` it calls `response.render`. The `render` method is express's clue that it should use the templating engine. Here's the changed code:

```javascript
app.get('/', function(request, response){
	response.render('index');
});
```

Ok! We're telling express that when it gets a request for the "/" (root) url, it should render the "index" template. You might wonder how express knows where to find the index template. That's a good question. The default behavior is for express to look for a directory called "views" and for it to look for files that end with the ".handlebars" extension, since we've specified that handlebars is our templating engine.

So, the last step is to add those. Create a directory called "views" and add a file called "index.handlebars", with this text:  "Hello, World (Handlebars edition)".

Restart your server if it wasn't running, and go visit [http://localhost:5000](http://localhost:5000). You'll see...Hello World. Again. Not yet very dynamic, but we can change that in a moment.

So far, all the code together looks [like this](https://gist.github.com/bantic/10219172).

Change the code in `index.handlebars` to look like this:

    Hello, {{name}}

The curly braces indicate to handlebars that it should find a variable called `name` and insert it into the index.handlebars file at that spot before it sends the resulting HTML to the browser. If you reload your app in the browser now you'll see "Hello, ". That's because we haven't yet given it a `name` variable.

Change the line that says `response.render('index');` to this:

`response.render('index', {name: 'Simon'});`

Reload the browser and, voila, it will now say "Hello, Simon".

Let's change our index.handlebars one more time, to this:

    Hello there, your lucky number is: {{luckyNumber}}.

And change the `response.render` line to this:

`response.render('index', {luckyNumber: Math.round( Math.random() * 10 )})`

The full code is [here, on github](https://gist.github.com/bantic/10219706).

Open your browser. Hit reload a few times. You'll see the number change. _Now_ we have a dynamic web server!

### Using a layout

HTML today contains a fair amount of boilerplate. Every page needs to have "<html>" at the top, as well as a "<head>" and a "<body>" section. Most pages all share the same css and javascript tags as well. When we have to copy and paste all this boilerplate code into every one of our templates, then it becomes a real drag if we later decide there's another javascript file to include, because we have to go through each and every template and update it to include the new file.

The handlebars templating engine creators are aware of this annoyance, and they use a concept called a "layout" to make this boilerplate easy to keep in a single spot.

A layout is a template that wraps around your other templates automatically. Inside a layout you include the text `{{{ body }}}` somewhere, and the contents of the template you asked express to render (for instance, the "index" template) will be injected into the layout at that spot. _Notice_ that there are _three_ curly braces on either side of the body. That's a clue to handlebars to not escape the HTML before it injects it into this spot, which is normally its default behavior.

If you want to use a layout you need to configure your express handlebars object in your app code to tell it what file to use as the default layout. Change this line:

`var handlebars = expressHandlebars.create();`

to this

`var handlebars = expressHandlebars.create({defaultLayout: 'main'});`

Now every time you call `response.render('someTemplateName')`, the rendered contents of your template will be injected into the main layout.

The full code is [on github](https://gist.github.com/bantic/10220579).
