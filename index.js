var express = require('express');
var bodyparser = require('body-parser');
var DataStore = require('nedb');
var Cors = require("cors"); 

var port = (process.env.PORT || 3000);
var BASE_URL = "/api/v1";
var filename = __dirname + "/contacts.json";
 
var path = require('path') 
const CONTACTS_APP_DIR = "contacts-app/dist/contacts-app"; 

var db = new DataStore({
    filename: filename,
    autoload: true
})

console.log("Starting API server...");
var contacts = [{
        "name": "juan",
        "phone": 3333
    },
    {
        "name": "jorge",
        "phone": 34523
    },
    {
        "name": "pepe",
        "phone": 523532
    }
]
var app = express();
app.use(bodyparser.json());
app.use(Cors());
app.use(express.static(path.join(__dirname, CONTACTS_APP_DIR))); 
app.get('/', function(req, res) { 
res.sendFile(path.join(__dirname, CONTACTS_APP_DIR, '/index.html')); 
}); 
 

db.find({}, (err, contacts) => {
    if (err) {
        console.error("Error accesing DB");
        process.exit(1);
    } else {
        if (contacts.length == 0) {
            console.log("Empty DB, initializaing data...");
            db.insert(initialContacts);
        } else {
            console.log("Loaded DB with " + contacts.length + " contacts.");
        }

    }
});

app.get("/", (req, res) => {
    res.send("<html><body><h1>My server</h1></body></html>");
});

app.get(BASE_URL + "/contacts", (req, res) => {
    console.log("Getting all contacts");
    db.find({}, (err, contacts) => {
        if (err) {
            console.error("Error accessing database");
            res.sendStatus(500);
        } else {
            res.send(contacts.map((c) => {
                delete c._id;
                return c
            }));
        }
    });
});

app.put(BASE_URL + "/contacts", (req, res) => {
    console.log("Put contacts -> " + Date());
    res.sendStatus(403); // forbidden
});

app.put(BASE_URL + "/contacts/:name", (req, res) => {

    var name = req.params.name;
    var contact = req.body;
    console.log("Contact to update -> " + name);
    console.log("Contact to update -> " + contact);

    db.update({
        "name": name
    }, contact, (err, rowsUpdated) => {
        if (err) {
            console.error("Error accesing database");
            res.sendStatus(500);
        } else {
            if (rowsUpdated > 1) {
                console.warn("Incosistent database");
            } else if (rowsUpdated == 0) {
                res.sendStatus(404);
            } else {
                res.status(200).send(JSON.stringify(contact));
            }
        }
    });

});


app.post(BASE_URL + "/contacts", (req, res) => {
    console.log("Adding new contact");
    var contact = req.body;
    db.insert(contact);
    res.status(201).send(JSON.stringify('Created'));
});

app.delete(BASE_URL + "/contacts", (req, res) => {

    console.log("delete all data");
    db.remove({});
    res.sendStatus(200);
});

app.delete(BASE_URL + "/contacts/:name", (req, res) => {
    console.log("delete contact using name");

    var name = req.params.name;
    db.remove({
        "name": name
    }, (err, rowsDeleted) => {
        if (err) {
            console.warn("error deleting the database");
            res.sendStatus(500);
        } else {
            if (rowsDeleted > 1) {
                console.log("incosistence db ");
            } else {
                res.status(200).send(JSON.stringify('Deleted'));
            }
        }
    });
});

app.listen(port);

console.log("Server ready!");