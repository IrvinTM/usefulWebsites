import { readJson } from "../utils.js"
import { randomUUID } from 'node:crypto'
const data = readJson('./data.json')
import { validateWebsiteData } from "../schemas/websites.js"

export class websiteModel {
  static async getWebsites({category}) {
    if (category) {
        const filteredCategories = data.filter((sites) => {
            return sites.category.some((cat) => cat.toLowerCase() === category.toLowerCase())
        } )
        if (filteredCategories && filteredCategories.length > 0) {
        return (filteredCategories)
        }
    } else {
        return(data);
    }
  }

  static async addWebsite(websiteData) {
    const website = validateWebsiteData(websiteData);
    if (website.success) {
        const newWebsite = {
          id : randomUUID(),
          ...websiteData
        }
        return newWebsite
      }
  }

  static async getWebsiteById({id}) {
    const website = data.find((element) => element.id === id);
    if (website) {
        return website
    }
  }

  static async updateWebsite({id, websiteData}) {
    const website = validateWebsiteData(websiteData);
    if (website.success) {
        const websiteIndex = data.findIndex((element) => element.id === id);
        if (websiteIndex !== -1) {
            data[websiteIndex] = {
                id,
                ...websiteData
            }
            return data[websiteIndex]
        }
    }
  }

  static async deleteWebsite({id}) {
    const websiteIndex = data.findIndex((element) => element.id === id);
    if (websiteIndex !== -1) {
        const deletedWebsite = data.splice(websiteIndex, 1);
        return deletedWebsite
    }
  }


  
}