import { randomUUID } from "node:crypto";
import { validateWebsiteData } from "../schemas/websites.js";
import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "postgres",
  port: 5432,
});

export class websiteModel {

  static async getWebsites({ category }) {
    try {
    const query = "SELECT * FROM websites";
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
      const { rows: filteredRows } = await pool.query(queryWithCategory, [
        categoryId,
      ]);
      const filteredCategories = filteredRows;

      if (filteredCategories && filteredCategories.length > 0) {
        return filteredCategories;
      }
    } else {
      return websites;
    }
  }
  catch (error) {
    console.log("There was an error");

  }
}

  static async addWebsite(websiteData) {
    const website = validateWebsiteData(websiteData);
    if (website.success) {
      const newWebsite = {
        id: randomUUID(),
        ...websiteData,
      };
      const categoryQuery = `SELECT id
        FROM categories
        WHERE LOWER(name) = LOWER($1)
        LIMIT 1;`;
      const { rows } = await pool.query(categoryQuery, [newWebsite.category]);
      const existentCategory = rows[0].id;
      if (rows[0].id.length === 0) {
        try {
          const query = `INSERT INTO categories (id, name) VALUES ($1, $2) RETURNING *;`;
          const values = [randomUUID(), newWebsite.category];
          const { rows } = await pool.query(query, values);
          const categoryId = rows[0].id;
          const websiteQuery = `INSERT INTO websites (id, name, url, description, registration_required, category_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`;
          const websiteValues = [
            newWebsite.id,
            newWebsite.name,
            newWebsite.url,
            newWebsite.description,
            newWebsite.registration_required,
            categoryId,
          ];
          const { rows: websiteRows } = await pool.query(
            websiteQuery,
            websiteValues
          );
          return true;
        } catch (error) {
          console.log("There was an error");
          return false;
        }
      } else {
        try {
          const categoryId = existentCategory;
          const query = `INSERT INTO websites (id, name, url, description, registration_required, category_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`;
          const values = [
            newWebsite.id,
            newWebsite.name,
            newWebsite.url,
            newWebsite.description,
            newWebsite.registration_required,
            categoryId,
          ];
          const { rows } = await pool.query(query, values);
          console.log(rows);
          return true;
        } catch (error) {
          console.log("There was an error");
          return false;
        }
      }
    }
  }

  static async getWebsiteById({ id }) {
    try{
    const query = `SELECT * FROM websites WHERE id = $1`;
    const { rows } = await pool.query(query, [id]);
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  }
  catch (error) {
    console.log("There was an error");
  }
  }

  static async updateWebsite({ id, websiteData }) {
    try{
    const website = validateWebsiteData(websiteData);
    if (website.success) {
      const query = `UPDATE websites SET name = $1,
         url = $2, description = $3,
         registration_required = $4
          WHERE id = $5 RETURNING *;`;
      const values = [
        websiteData.name,
        websiteData.url,
        websiteData.description,
        websiteData.registration_required,
        id,
      ];
      const { rows } = await pool.query(query, values);
      if (rows.length === 0) {
        return null;
      }
      return rows[0];
    }
  }
  catch (error) {
    console.log("There was an error");
  }
  }

  static async deleteWebsite({ id }) {
    try{
    const query = `DELETE FROM websites WHERE id = $1 RETURNING *;`;
    const { rows } = await pool.query(query, [id]);
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  }
  catch (error) {
    console.log("There was an error");
  }
  }
}
