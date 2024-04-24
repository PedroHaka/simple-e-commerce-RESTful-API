# E-Commerce Node.JS API


## About this project

<p>This Node.JS based API was developed to simulate an e-commerce management system, regarding products and orders that end users could possibly interact with.</p>
<p>The RESTful interface would allow for quick, secure and efficient proccesses, while the integration with a database would register and persist data across multiple users and sessions.</p>
<hr><hr>

## Files and Directories Structure

/**api**              >Folder containing our resources and the respective routes and DB models.  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/**models**             >MongoDB/Mongoose schemas/models for our persisted data objects.  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*product.js*      >MongoDB/Mongoose schema/model for product resources.  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/**overview**           >Project overview in image format for better visualization.  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*Simple(...).png* >Image for basic understanding of this APIs supported operations.  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/**routes**             >Routes for our http requests, as well as supported http methods.  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*orders.js*       >Route for our orders resources, also defining supported http methods.  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*products.js*     >Route for our products resources, also defining supported http methods.  
/**node_modules**           >Standard directory for node.js packages.  
*app.js*                  >Main module, connecting all other modules to work together  
*nodemon.json*            >Contains the environment variable for DB connection. password  
*package-lock.json*       >Detailed info on dependencies and packages needed for this API.  
*package.json*            >Simple info on dependencies, also contains custom scripts.  
*README.md*               >About this project, you are reading this file right now  
*server.js*               >Sets up our server configuration and initialization

