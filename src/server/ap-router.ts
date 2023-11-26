import express from "express";
// import testdata from "./test-data.json"
import cors from "cors"
import { connectClient } from "./db";

const router = express.Router();

router.use(cors());
router.use(express.json())

// Fetching Route
router.get("/contests", async (req, res) => {
    const client = await connectClient();

    const contests = await client.collection("contests")
    .find()
    .project({
        id: 1,
        categoryName: 1,
        contestName: 1,
        _id: 0,
    })
    .toArray();
    res.send({contests});
})

// Updating Route
router.get("/contest/:contestId", async (req, res) => {
    const client = await connectClient();
    const contest = await client
    .collection("contests")
    .findOne({id: req.params.contestId})

    res.send({contest})
})

// Delete Route
router.delete("/delete/:contestId", async (req, res) => {
    const client = await connectClient();
    const deleted = await client
    .collection("contests")
    .deleteOne({id: req.params.contestId})
    console.log("Recored deleted");
    res.send({deleted})
})

// Posting Route
router.post("/contest/:contestId", async (req, res) => {
    const client = await connectClient();
    const { newNameValue } = req.body;
    const doc = await client
    .collection("contests")
    .findOneAndUpdate(
        {id: req.params.contestId},
        {
            $push: {
                names: {
                    id: newNameValue.toLowerCase().replace(/\s/g, "-"),
                    name: newNameValue,
                    timestamp: new Date(),
                },
            },
        },
        {
            returnDocument: "after"
        },
    )

    res.send({updatedContest: doc.value})
})


// Creating New contest Route
router.post("/contests/", async (req, res) => {
    const client = await connectClient();
    const {contestName,contestCategory,contestDescription} = req.body;
    const newContest = await client
        .collection("contests")
        .insertOne(
        {
            id: contestName.toLowerCase().replace(/\s/g, "-"),
            contestName:contestName,
            categoryName:contestCategory,
            description:contestDescription,
            names: [],
        }
    );
    console.log(
    contestName,
    contestCategory,
    contestDescription,)
    
    const contest = await client
    .collection("contests")
    .findOne({_id: newContest.insertedId})

    res.send({contest})
});

export default router