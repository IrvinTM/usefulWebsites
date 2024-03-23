import { Router } from "express"
import { websiteControler } from "../controlers.js/website.js"

export const webRouter = Router()

webRouter.get("/", websiteControler.getAll)

    webRouter.post("/", websiteControler.addWebsite)

    webRouter.get("/:id", websiteControler.getWebsiteById)

    webRouter.patch("/:id", websiteControler.updateWebsite)

    webRouter.delete("/:id", websiteControler.deleteWebsite)
