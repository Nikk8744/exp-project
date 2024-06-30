const express = require('express');
const users = require('./MOCK_DATA.json');
const fs = require('fs');
const app = express();
const PORT = 8000;

app.use(express.urlencoded({extended: false}));

app.get("/users", (_ , res) => {
    const html = `
    <ul>
        ${users.map(user => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
    return res.send(html);
});
// REST API
app.get("/api/users", (req, res) => {
    return res.json(users)
});

app.get("/api/users/:id", (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
});

app.post("/api/users", (req, res) => {
    const body = req.body;
    users.push({...body, id: users.length + 1});
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        return res.json({ status : "Sucess", id: users.length});
    })
});

app.patch("/api/users/:id", (req, res) => {
    const id = Number(req.params.id);

});

app.delete("/api/users/:id", (req, res) => {
    const id = Number(req.params.id);
    // users.delete({})
    const UserIndex = users.findIndex((user) => user.id === id);
    if(UserIndex != -1){
        users.splice(UserIndex, 1);
    }
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err,data)=>{
        return res.json({ status: "Sucessfully Removed"});
    })
});


app.listen(PORT, () => console.log("Server started ar PORT: " + PORT));