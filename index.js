const express = require("express");
const app = express();
app.use(express.static("public"));
const exphbs = require("express-handlebars");
const port = 3000;
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");
const translations = require("./translations.json");

app.get("/", (req, res) => {
    res.redirect("/fr");
});
app.get("/:lang", (req, res) => {
    const lang = req.params.lang;
    const translation = translations[lang];
    translation["flag"] = `img/${lang}.png`;
    if (!translation) res.render("home", translations["fr"]);
    res.render("home", translation);
});
app.listen(port, () => {
    console.log("Server is listening on " + port);
});
