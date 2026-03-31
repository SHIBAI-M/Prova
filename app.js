import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import { createClient } from '@supabase/supabase-js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

const PORT = process.env.PORT || 6534;

app.use(cors())
app.use(express.json())
app.use(express.static('public'))

const supabaseUrl = 'https://zgvswebbqyhlutsbmmhh.supabase.co'
const supabaseKey = 'sb_publishable_i_vY__tsWiyw095TBNo4Rw_usKIL4LM'
const supabase = createClient(supabaseUrl, supabaseKey)

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'cadastro.html'))
})

app.post('/cadastrar', async (req, res) => {
  console.log("Recebido:", req.body);

  const { nome, email, telefone } = req.body;

  const { data, error } = await supabase
    .from('usuarios')
    .insert([{ nome, email, telefone }]);

  if (error) {
    console.log("Erro:", error);
    return res.status(500).json({ erro: error.message });
  }

  console.log("Salvou no banco!"); 

  res.status(200).json({ mensagem: 'Salvo com sucesso' });
});

app.listen(PORT, () => {
  const url = `http://localhost:${PORT}`;
  console.log(`Servidor rodando em: ${url}`);
});