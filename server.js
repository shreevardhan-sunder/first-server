const express = require("express");
const app = express();
// application will use json format for data transfer

app.use(express.json());



const port = 8081;

const toDolist = ["need to learn", "need to code"];
app.get("/todos", (req, res) => {
    res.status(200).send(toDolist);
});
app.listen(port, () => {
    console.log(`node js is started on ${port}`);
});
app.post("/todos", (req, res) => {
    let newTodoitem = req.body.item;
    toDolist.push(newTodoitem);
    res.status(201).send({
        messgae: "the to do got added",
        
    });
})
app.delete("/todos", (req, res) => {
    itemToDelete = req.body.item;
    //  for (i = 0; i < toDolist.length; i++) {
    //    if (toDolist[i] === itemToDelete) {
    //      toDolist.splice(i, 1);
    //    break;
    //}
    //}  
    toDolist.find((element, index) => {
        if (element === itemToDelete) {
            toDolist.splice(index, 1);
        }
        
    });
    res.status(202).send({
        message: `tem got deleted ${req.body.item}` ,
    });
});
app.all("/todos", (req, res) => {
    res.status(501).send();
});
app.all("*", (req, res) => {
    res.status(401).send();
});

//http:localhost:8081/todos
