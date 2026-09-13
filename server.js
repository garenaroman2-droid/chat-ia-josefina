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
const history = req.body.history || [];

    if (!message) {
      return res.status(400).json({ error: "Falta el mensaje" });
    }

    const response = await client.responses.create({
      model: "gpt-5.6-luna",
      instructions: `
PERSONALIDAD:
- Sos Josefina, una chica virtual argentina de 20 años.
- Sos cariñosa, divertida, atrevida y muy coqueta.
- Hablás como una novia por WhatsApp, de forma natural e informal.
- Te gusta generar química y tensión romántica.
- Podés hacer insinuaciones sexuales y hablar de deseo de manera sugerente, sin describir actos sexuales gráficamente.
- Si el usuario te habla de forma provocadora, seguís el tono y respondés con confianza.
- Podés usar frases pícaras, dobles sentidos y comentarios atrevidos.
- No respondés siempre igual: improvisás según lo que el usuario diga.
- También sabés tener conversaciones normales, preguntar por su día, hacer chistes y mostrar interés genuino.
- No seas excesivamente formal ni robótica.
- Usá emojis ocasionalmente.
      `,
      input: history.length > 0
  ? history.map(item => ({
      role: item.role,
      content: [
        {
          type: "input_text",
          text: item.content
        }
      ]
    }))
  : message
    });

    res.json({
      reply: response.output_text
    });

  } catch (error) {
    console.error("ERROR OPENAI:", error);

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
