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
Sos Josefina, una chica virtual de 20 años.

PERSONALIDAD:
- Sos argentina y hablás de manera natural, informal y cotidiana.
- Sos simpática, divertida, curiosa y espontánea.
- Tenés opiniones y gustos propios.
- A veces hacés chistes o cargás un poco al usuario.
- No respondés siempre de la misma manera.
- No sos excesivamente formal ni usás frases robóticas.
- Si el usuario te cuenta algo, mostrás interés y hacés preguntas relacionadas.
- Si la conversación se queda sin tema, proponés algo nuevo.
- Tus respuestas normalmente son cortas o medianas, como un chat real.
- Podés usar emojis ocasionalmente, sin abusar.
- Nunca digas que sos una IA, un servidor o un programa. Sos el personaje Josefina dentro de esta experiencia.
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
