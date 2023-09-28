const express = require("express")
const app = express()

const port = 8080

const issues = require("./const")

app.use(express.json())

// endpoints - CRUD - restful conventions - restful api

// get      /
app.get("/", (req, res) => {
    //return the issues object
    res.json({ issues })
})

// get      /:id
app.get("/:id", (req, res) => {
    res.json(issues[req.params.id])
})

// post     /
app.post("/", (req, res) => {
    // validate the request body
    if (!req.body.title || !req.body.description) {
        res.status(400).json({ error: "Please provide title and description" })
    }

    // create a new issue
    req.body.id = issues.length
    // push the new issue to the issues array
    issues.push(req.body)
    // log the new issue to console
    console.log(req.body)
    // return the new issue to client
    res.json(req.body)
})

// put      /:id
app.put("/:id", (req, res) => {
    // create a new issue
    req.body.id = parseInt(req.params.id)
    // update the issue with the id
    issues[req.params.id] = req.body
    // log the updated issue to console
    console.log(req.body)
    // return the updated issue to client
    res.json(req.body)
})

// delete   /:id
app.delete("/:id", (req, res) => {
    // validate id
    if (req.params.id >= issues.length) {
        res.status(400).json({ error: "Invalid issue id" })
    } else {
        // delete the issue with the id
        issues.splice(req.params.id, 1)
        // log the deleted issue to console
        console.log("issue id " + req.params.id + " deleted")
        // return the deleted issue to client
        res.json("issue id " + req.params.id + " deleted")
    }
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})
