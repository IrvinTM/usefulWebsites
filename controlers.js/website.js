import { validateWebsiteData } from "../schemas/websites.js";
import { websiteModel } from "../models/websites.js";

export class websiteControler {

  static async getAll(req, res) {
    const { category } = req.query;
    const movies = await websiteModel.getWebsites({ category });
    if (movies) {
      res.send(movies);
    } else {
      res.status(404).send("Category not found");
    }
  }

  static async addWebsite(req, res) {

    const websiteData = validateWebsiteData(req.body)
    if (websiteData.success) {
        const newWebsite = await websiteModel.addWebsite(websiteData.data)
        data.push(newWebsite)
        res.send(data)
    } 
    else {
        res.status(400).send(websiteData.error)
    }
}

static async getWebsiteById (req, res){
const { id } = req.params;
const movies = await websiteModel.getWebsiteById({id})
if (movies) {
    res.send(movies)
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
