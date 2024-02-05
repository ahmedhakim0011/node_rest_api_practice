const express = require(`express`);
const users = require(`./MOCK_DATA.json`);
const fs = require(`fs`);


const app = express();
app.use(express.urlencoded({ extended: false }));

const PORT = 8000;

// ROUTES
app.get(`/api/users`, (req, res) => {
    return res.json(users);
});
app.post(`/api/users`, (req, res) => {
    //   TODD : create new user
    const body = req.body;
    users.push({ ...body, id: users.length + 1 });
    console.log(body);
    fs.writeFile(`./MOCK_DATA.json`, JSON.stringify(users), (err, data) => {
        return res.json({
            status: "success", id: users.length
        });
    });
});

app.route(`/api/users/:id`).get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find(user => user.id === id);
    return res.json(user);
}).patch((req, res) => {


    const id = Number(req.params.id);
    const body = req.body;
    const user = users.find((user) => user.id === id)
    const updatedUser = { ...user, ...body };
    updatedUser.id = id;
    users[id - 1] = updatedUser
    fs.writeFile('MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        return res.json({ status: "Success", updatedUser })
    });
}).delete((req, res) => {
    const id = Number(req.params.id);
    const index = users.findIndex(item => item.id === id);
    if (index !== -1) {
        users.splice(index, 1);
        res.json({ success: true, message: 'user deleted' });
    } else {
        res.status(404).json({ success: false, message: 'Item not found' });
    }

    //   TODD : DELETE user with ID
    return res.json({ status: "Peding" });

});


app.listen(PORT, () => console.log(`server started at this PORT ${PORT}`));



