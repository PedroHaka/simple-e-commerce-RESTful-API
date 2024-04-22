//Import http module from node.js. We don't need to specify the full path.
const http = require('http')

//Import our app.js module, here we do specify the ful path, but are 
//allowed to ommit the file extension .js as it will automatically 
//look for .js files. Remember just for the sake of clarification,
//our app.js is an express application.
const app = require('./app')

//Here we create our port, either from an environment variable using 
//process.env.PORT, but we didn't set any variable for this, so we use
//port 3000 instead.
const port = process.env.PORT || 3000

//Here we create our server using the aforementioned modules.
//In http module, we call for createServer() method, and pass our
//express application 'app.js'.
const server = http.createServer(app)

//Finally here we set our created server to listen to our port.
//That should make everything run as intended, given that app.js
//was also configured correctly, duh.
server.listen(port)


