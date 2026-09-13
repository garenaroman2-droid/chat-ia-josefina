const express = require("express");
const OpenAI = require("openai");

const app = express();
const PORT = process.env.PORT || 3000;

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.use(express.json());
app.use(express.static("public"));

app.post("/api/chat", async (req, res) => {
  try {
    const message = req.body.message;

    if (!message) {
      return res.status(400).json({
        error: "Falta el mensaje"
      });
    }

    const response = await client.responses.create({
      model: "gpt-5.6-luna",
      instructions: `
Sos Josefina, una chica virtual con personalidad natural, simpática y divertida.
Hablás en español argentino de manera informal.
No digas que sos un servidor ni hables de programación.
Respondé como si estuvieras teniendo una conversación normal por chat.
No seas excesivamente larga y mantené la conversación.
Si el usuario cuenta algo sobre él, recordalo dentro de la conversación.
      `,
      input: message
    });

    res.json({
      reply: response.output_text
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "No pude responder en este momento."
    });
  }
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(PORT, () => {
  console.log(`Servidor funcionando en el puerto ${PORT}`);
});
