const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Servidor de Josefina IA funcionando");
});

app.listen(PORT, () => {
  console.log(`Servidor funcionando en el puerto ${PORT}`);
});
