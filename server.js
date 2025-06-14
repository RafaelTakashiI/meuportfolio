const express = require("express");
const nodemailer = require("nodemailer");
const path = require("path");

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "public")));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "rafaeltakashiiwata@gmail.com", 
    pass: "bwyp vqax ziwc czeb",          
  },
});

app.post("/contato", (req, res) => {
  const { nome, email, mensagem } = req.body;

  const mailOptions = {
    from: email,
    to: "rafaeltakashiiwata@gmail.com", 
    subject: `Nova mensagem de ${nome}`,
    text: `
      Nome: ${nome}
      Email: ${email}
      Mensagem: ${mensagem}
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.send("Erro ao enviar. Tente novamente.");
    } else {
      console.log("Email enviado: " + info.response);
      return res.send("Mensagem enviada com sucesso!");
    }
  });
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
