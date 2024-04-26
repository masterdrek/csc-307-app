// backend.js
import express from "express";
import cors from "cors";
import userServices from "./services/user-services.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", async (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  const result = await userServices.getUsers(name, job);
  res.send({users_list : result})

});

app.get("/users/:id", async(req, res) => {
  const id = req.params["id"]; //or req.params.id
  console.log(id)
  try {
    const result = await userServices.findUserById(id);
    res.send({users_list : result})
  } catch (error) {
    res.status(404).send("Resource not found.");
  }
});
 
app.post("/users", async (req, res) => {
  const userToAdd = req.body;
  const result = await userServices.addUser(userToAdd);
  res.status(201).send({users_list : result})
});

app.delete("/users", async (req, res) => {
  const id = req.query.id;
  console.log("deleting: " + id)
  try {
    await userServices.deleteUserById(id);
    res.status(204).send()
  } catch (error) {
    res.status(404).send("Resource not found.");
  }
})

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});