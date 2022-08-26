const express = require('express');

//Initialisation
const app = express();

//Application now use json format.
app.use(express.json());

const port = 8081;

const myDetails = ["Rohit", "Ashish", "Sachin"];

app.get("/todo", (req, res) => {
    res.status(200).send(myDetails);
})

app.post("/todo", (req, res) => {
    let newTodoItem = req.body.item;
    myDetails.push(newTodoItem);
    res.status(201).send({
        message: "Task added successfully"
    });
});

app.delete("/todo", (req, res) => {
    const itemToDelete = req.body.item;
    // for (let i = 0; i < myDetails.length; i++) {
    //     if (myDetails[i] === itemToDelete) {
    //         myDetails.splice(i, 1);
    //         break;
    //     }
    // }

    myDetails.find((element, index) => {
        if (element === itemToDelete) {
            myDetails.splice(index, 1);
        }
    });

    res.status(202).send({
        Message: `Deleted item is ${itemToDelete}`
    });
});

app.all("/todo", (req, res) => {
    res.status(501).send();
});

app.all("*", (req, res) => {
    res.status(404).send();
});

app.listen(port, () => {
    console.log(`Node js server started at port ${port}`);
});


//http://localhost:8081