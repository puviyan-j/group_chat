const express = require("express")
const mongoose = require('mongoose');
const rooms = require("./dbroom")
const cors = require("cors")
const messages = require("./dbmessage");
const Pusher = require("pusher");

const pusher = new Pusher({
    appId: "1640497",
    key: "a7b390e6f30e7fb81d2d",
    secret: "959ae2983789d066e5f5",
    cluster: "ap2",
    useTLS: true
});


// roJFbmzlyi8K8fbx

mongoose.connect("mongodb+srv://whatsapp_clone:roJFbmzlyi8K8fbx@cluster0.ya3htxj.mongodb.net/whatsapp")

    .then(() => {
        const db = mongoose.connection;
        console.log("db coonected");

        const roomcollection = db.collection("rooms");
        const changestream = roomcollection.watch();

        changestream.on("change", (change) => {
            console.log(change)

            if (change.operationType === "insert") {

                const roomdetails = change.fullDocument;
                pusher.trigger("rooms", "insert",roomdetails);
            }

        })


        const messagecollection = db.collection("messages");
        const messagestream = messagecollection.watch();

        messagestream.on("change", (change) => {

            console.log(change)

            if (change.operationType === "insert") {
                const messagedetail = change.fullDocument;
                pusher.trigger("messages", "insert", messagedetail);

            }
        })

    })
    .catch(() => {
        console.log("db is not connected");
    })

const app = express()
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.json("welcome")
});

app.post("/post", async (req, res) => {


    const name = new rooms({ name: req.body.roomname })


    const save = await name.save()
        .then((data) => {
            res.status(200).send(data)
        })
        .catch((err) => {
            res.status(500).send(err)
            console.log(err)
        })

});

app.get("/room", async (req, res) => {
    await rooms.find()
        .then((data) => {
            res.json(data)
        })
        .catch((err) => {
            res.send(err)
        })

});
app.get("/rooms/:id", async (req, res) => {

    const roomname = await rooms.find({ _id: req.params.id });
    res.json(roomname)
})

app.post("/message", async (req, res) => {

    const msg = new messages({
        ...req.body
    })

    await msg.save()
        .then((data) => {
            res.send(data)
        })

});

app.get("/message/:roomid", async (req, res) => {

    const msg = await messages.find({ roomid: req.params.roomid });
    res.send(msg)
});

app.listen(5000, () => {
    console.log("server is running");
})