// what is the main purpose of building a restful api?
// The main purpose is to manage backend data using http methods 

const e = require("express");
const { default: mongoose } = require("mongoose");


// which HTTP method is used to partially or fully update existing data?
// the method is either PATCH(partially) or PUT(fully)

// Express.js is mainly used for
// Mainly used for building server routes and handling HTTP requests and responses in Node.js applications.

// what role does mongoose play in a Node.js application?
// Mongoose acts as an Object Data Modeling (ODM) library that provides a schema-based solution to model application data, making it easier to interact with MongoDB databases.

// but in API-Database flow; mongodb stores and retrieves data

// Dynamic application changes it user interface based on; Data, events and user actions or interactions

// what is the purpose of routes like a routes such as /user/:id
// in simple terms u can just say to Accept dynamic url parameters for resource identification

// the DELETE request is used to remove existing data from a server or database.
// while the GET request is used to retrieve or fetch data from a server or database.

// middleware in express does what? in simple terms it process requests before they reach the final route handler or before sending a response to the client.

// what does bcrpt does? it commonly used for hashing passwords to enhance security in applications.

// Authentication is the process of verifying the identity of a user or system, while Authorization determines what resources or actions that authenticated user or system is allowed to access or perform.

// in simple term authentication is confirming who the user is while authorization is given or restricting access to resources based on user permissions.

// what does expression-session store? it store session data on the server side to maintain user state across multiple requests in a web application or User session data for authentication and personalization purposes.

// what happens if a required field is missing and validation is not done?
// If a required field is missing and validation is not done, it can lead to incomplete or incorrect data being processed or stored, which may cause errors, unexpected behavior, or security vulnerabilities in the application or the server may accept incorrect or empty data, leading to potential errors or inconsistencies in the application.

// some few practical questions am likely to ask?
// what does this routes below return to the server?
app.get('/api', (req, res) => {
    res.send("API is running...")
});
// the above returns a plain text

// what is happening in the code below?
app.post('/create', (req, res) => {
    console.log(req.body);
});
// the above code example, no response is being sent back to the client after logging the request body to the server console. This could lead to the client waiting indefinitely for a response, potentially causing a timeout error. To fix this, a response should be sent back to the client using res.send(), res.json(), or another appropriate method.

// what does this middleware in the code example below does?
app.use(e.json());
// the above middleware parses incoming JSON request bodies and makes the data available under req.body in route handlers.

// like for the code example below, what issues do u think is their?
mongoose.connect();
// for the code example above, the issue is that the connect() method is called without any arguments. It should include a MongoDB connection string (URI) to specify the database to connect to, along with optional configuration settings. Without this information, the connection attempt will fail or in simple terms Missing Mongodb URI

// what does the route actually do in the code example below?
app.delete('/user/:id', (req, res) => {
    res.send("Deleted")
});
// the above route handles DELETE requests to the /user/:id endpoint, where :id is a dynamic parameter representing the user's ID. When a DELETE request is made to this endpoint, it responds with the plain text message "Deleted", indicating that the user with the specified ID has been deleted (though in this example, no actual deletion logic is implemented) or only sends text response without deleting any user data.

// what is wrong with the code example below?
app.get('/data', (req, res) => {
    return {message: "Hello"}
});
// the issue with the above code example is that it attempts to return a JavaScript object directly from the route handler without using the res object to send a response to the client. In Express.js, you should use res.json() or res.send() to send data back to the client or in simple terms should use res.send() or res.json() to send the response.

// the example below console.logs what?
console.log(req.params.id);
// the above code logs the value of the dynamic URL parameter id from the request object req. This is typically used in routes that include a parameter in the URL, such as /user/:id, where :id represents a variable part of the URL that can be accessed via req.params.id or in simple term it logs out URL parameter id value.