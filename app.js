const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const routeur = require('./routes/routes');
app.use('/', routeur);
//pour les runner le pc env
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Serveur en écoute sur le port ${port}`);
});





// Roman to arabic number




//////////////////////////////////////
const cachedResults = {};

app.get('/getRomanValue/:roman', (req, res) => {
  try {
    const inputRoman = req.params.roman.toUpperCase();

    if (cachedResults[inputRoman]) {
      res.status(200).json({ arabic: cachedResults[inputRoman] });
      return;
    }

    const arabic = romanToArabic(inputRoman);
    res.log(response);

    cachedResults[inputRoman] = arabic;

    res.status(200).json({ arabic });
  } catch (error) {
    res.log(response);
    res.status(400).json({ error: error.message });
  }
});
