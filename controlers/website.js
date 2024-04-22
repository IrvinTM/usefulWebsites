import { validateWebsiteData } from "../schemas/websites.js";
import { websiteModel } from "../models/websites.js";

export class websiteControler {

  static async getAll(req, res) {
    const { category } = req.query;
    const websites = await websiteModel.getWebsites({ category });
    if (websites) {
      res.send(websites);
    } else {
      res.status(404).send("Not found");
    }
  }

  static async addWebsite(req, res) {

    const websiteData = validateWebsiteData(req.body)
    if (websiteData.success) {
        const newWebsite = await websiteModel.addWebsite(websiteData.data)
        if(newWebsite)
        res.send("website added")
    } 
    else {
        res.status(400).send(websiteData.error)
    }
}

static async getWebsiteById (req, res){
const { id } = req.params;
const websites = await websiteModel.getWebsiteById({id})
if (websites) {
    res.send(websites)
}
else {
    res.status(404).send("Website not found")
}
}

static async updateWebsite (req, res){
    const { id } = req.params;
    const websiteData = validateWebsiteData(req.body)
    if (websiteData.success) {
        const updatedWebsite = await websiteModel.updateWebsite({id, websiteData: websiteData.data})
        if (updatedWebsite) {
            res.send(updatedWebsite)
        }
        else {
            res.status(404).send("Website not found")
        }
    }
    else {
        res.status(400).send(websiteData.error)
    }
}

static async deleteWebsite (req, res){
    const { id } = req.params;
    const deletedWebsite = await websiteModel.deleteWebsite({id})
    if (deletedWebsite) {
        res.send(deletedWebsite)
    }
    else {
        res.status(404).send("Website not found")
    }
}
}
