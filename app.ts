import express from "express";
import bodyParser from "body-parser";
import { list } from "./src/lists";

const app = express();
const port = 9000;

app.use(bodyParser.json());

app.get("/", (_req, res) => res.send('It\'s Working'));
app.get("/list", (_req, res) => res.send(list));


app.post('/delete-list', (req, res) => {
    const id: string = req.body.id;

    for (let i = 0; i < list.length; i++) {
        if (list[i].id === id) {
            return res.send(list.splice(i, 1));
        }
    }

    return res.send("failed to deleted listing");
});




app.listen(port);

console.log(`[server]: http://localhost:${port}`);