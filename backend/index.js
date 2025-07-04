require('dotenv').config();
const express = require('express');
const app = express();
const { OpenAI } = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.use(express.json());

app.post('/otimizar', async (req, res) => {
  const { html, css } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "Você é um assistente de front-end. Otimize centralização visual e explique o que mudou." },
        { role: "user", content: `HTML:\n${html}\nCSS:\n${css}` }
      ]
    });

    const resposta = completion.choices[0].message.content;
    res.json({ resposta });
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao consultar IA.");
  }
});

app.listen(3000, () => console.log("Backend rodando na porta 3000"));
