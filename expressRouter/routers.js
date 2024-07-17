import express from "express";
import { Book } from "../moudels/bookModule.js";
const router= express.Router()
router.post("/", async (req, res) => {
    try {
        if (!req.body.title || !req.body.auther || !req.body.bublichYear) {
            return res.status(400).send({ message: "please insert all requierd fildes" });
        }
        const newBook = {
            title: req.body.title,
            auther: req.body.auther,
            bublichYear: req.body.bublichYear
        }
        const book = await Book.create(newBook);
        return res.status(201).send(book);
    } catch (error) {
        console.log(error.message);
        res.status(404).send({ message: error.message })
    }
})


router.get("/", async (req, res) => {
    try {
        const books = await Book.find({});
        return res.status(200).json({
            count: books.length,
            data: books
        })
    } catch (error) {
        console.log({ message: error })
        res.status(500).send({ message: error.message })
    }
})

router.get("/:id", async (req, res) => {
    const { id } = req.params
    try {
        const spcifcBook = await Book.findById(id);
        return res.status(200).json(spcifcBook)
    } catch (error) {
        console.log({ message: error })
        res.status(500).send({ message: error.message })
    }
})


router.put("/:id", async (req, res) => {
    try {
        if (!req.body.title || !req.body.auther || !req.body.bublichYear) {
            return res.status(400).send({ message: "please update all requierd fildes" });

        }
        {
            const { id } = req.params;
            const result = await Book.findByIdAndUpdate(id, req.body);
            if (!result) {
                return res.status(404).json({ message: 'book not found' })
            }
            return res.status(200).send({ message: "book updated successfully" });
        }


    } catch (error) {
        console.log({ message: error })
        res.status(500).send({ message: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const result = await Book.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ message: "book not found" })
        } {
            return res.status(200).send({ message: "book has been deleted successfully" })
        }

    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
})
export default router;