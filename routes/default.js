import { Router } from "express"
import { readJson } from "../utils.js"
const data = readJson('./data.json')

export const drouter = Router()

drouter.get("/", (req, res) => {
    res.send('<h1>Usefull api</h1>');
}
)