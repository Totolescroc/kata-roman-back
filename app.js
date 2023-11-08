const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());
const port = 3001;
app.listen(port, () => {
  console.log(`Serveur en écoute sur le port ${port}`);
});

function arabicToRoman(number) {
  if (isNaN(number) || number < 1 || number > 3999) {
    throw new Error('Le nombre doit être compris entre 1 et 3999.');
  }

  const romanNumerals = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1,
  };

  let roman = '';

  for (const key in romanNumerals) {
    while (number >= romanNumerals[key]) {
      roman += key;
      number -= romanNumerals[key];
    }
  }

  return roman;
}

app.post('/convert', (req, res) => {
  try {
    const inputNumber = req.body.number;

    if (!inputNumber) {
      res.status(400).json({ error: 'Veuillez fournir un nombre dans la requête.' });
      return;
    }

    const arabic = parseInt(inputNumber);
    const roman = arabicToRoman(arabic);

    res.status(200).json({ roman });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.use(express.static(__dirname + '/frontend'));