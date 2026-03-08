require('dotenv').config();
const express = require('express');
const app = express();
const path= require ('path');
const port = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGO_URI;
let userLoginData;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function startServer() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");

        const db = client.db("dbs");
        userLoginData = db.collection("userLoginData");


        app.post("/signup", async (req, res) => {

            const { name, email, password } = req.body;

            const result = await userLoginData.insertOne({
                name,
                email,
                password,
                createdAt: new Date()
            });

            res.json({ success: true, id: result.insertedId });
        });

        app.listen(8080, () => {
            console.log("Server running at http://localhost:8080");
        });

    } catch (err) {
        console.error("Server failed to start:", err);
    }
}

startServer();

