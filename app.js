const express = require("express");
const data = require("./data.json");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send('<h1>Usefull api</h1>');
});

app.get("/websites", (req, res) => {
    const { category } = req.query;
  
    if (category) {
        const websites = data.resources.find(resource => resource.category.toLowerCase() === category.toLowerCase());
        if (websites) {
          res.send(websites.sites);
        } else {
          res.status(404).send("Category not found");
        }
      } else {
        res.send(data.resources);
      }
}
);

const port = process.env.PORT ?? 3000;
//comment

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
