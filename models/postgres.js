import { randomUUID } from 'node:crypto'
import { validateWebsiteData } from "../schemas/websites.js"
import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'postgres',
    port: 5432,
  });

export class websiteModel {

    static async getWebsites({category}) {
        const query = 'SELECT * FROM websites';
        const { rows } = await pool.query(query);
        const websites = rows;
        
        if (category) {
            const categoryQuery = `SELECT id 
            FROM categories 
            WHERE LOWER(name) = LOWER($1) 
            LIMIT 1;`;
            const { rows } = await pool.query(categoryQuery, [category]);
            if (rows.length === 0) {
                return null;
            }
            const categoryId = rows[0].id;
            const queryWithCategory = `
            SELECT * 
            FROM websites 
            WHERE category_id = $1
        `;
            const { rows: filteredRows } = await pool.query(queryWithCategory, [categoryId]);
            const filteredCategories = filteredRows;
            
            if (filteredCategories && filteredCategories.length > 0) {
                return filteredCategories;
            }
        } else {
            return websites;
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