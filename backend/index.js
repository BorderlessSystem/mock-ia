require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

// 🧠 Base de padrões (mock inteligente)
const padroes = [
  {
    nome: 'centralização com data-opt',
    condicao: (html) => html.includes('data-opt="centralize"'),
    resposta: `
Para centralizar o elemento com \`data-opt="centralize"\`, adicione isso ao CSS:

\`\`\`css
[data-opt="centralize"] {
  margin-left: auto;
  margin-right: auto;
  width: fit-content;
}
\`\`\`

📌 Isso funciona porque usar \`margin auto\` em ambos os lados com um width definido centraliza o bloco horizontalmente.
    `.trim()
  },
  {
    nome: 'centralização com flexbox',
    condicao: (html, css) => css.includes('display: flex') && css.includes('justify-content'),
    resposta: `
Seu layout já usa Flexbox!

👨‍🏫 Para centralizar completamente um elemento com Flexbox:

\`\`\`css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
\`\`\`

💡 Use \`justify-content\` para alinhar no eixo principal e \`align-items\` no eixo cruzado.
    `.trim()
  },
  {
    nome: 'centralização com position absolute',
    condicao: (html, css) =>
      css.includes('position: absolute') &&
      css.includes('top: 50%') &&
      css.includes('left: 50%'),
    resposta: `
Você está usando \`position: absolute\`. Para centralizar corretamente:

\`\`\`css
.elemento {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
\`\`\`

⚠️ A transformação com \`translate\` compensa o deslocamento visual causado por top/left.
    `.trim()
  }
];

app.post('/otimizar', async (req, res) => {
  const { html, css } = req.body;

  // Verifica se algum padrão foi identificado
  const sugestao = padroes.find((padrao) => padrao.condicao(html, css));

  if (sugestao) {
    return res.json({ resposta: sugestao.resposta });
  }

  // Se nenhum padrão for encontrado, manda resposta padrão
  return res.json({
    resposta: `Não foi possível identificar um padrão conhecido para otimização. Tente adicionar 'data-opt="centralize"' no seu HTML para testar.`
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend mock rodando na porta ${PORT}`);
});
