const express = require(`express`);
const users = require(`./MOCK_DATA.json`);


const app = express();

const PORT = 8000;

// ROUTES
app.get(`/api/users`, (req, res) => {
    return res.json(users);
});
app.post(`/api/users`, (req, res) => {
    //   TODD : create new user
    return res.json({ status: "Peding" });

});

app.route(`/api/users/:id`).get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find(user => user.id === id);
    return res.json(user);
}).patch((req, res) => {
    return res.json({ status: "Peding" });

}).delete((req, res) => {
    //   TODD : DELETE user with ID
    return res.json({ status: "Peding" });

});


app.listen(PORT, () => console.log(`server started at this PORT ${PORT}`));



