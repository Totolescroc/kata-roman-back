const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());
const port = process.env.PORT || 3001;
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
// Roman to arabic number

app.post('/reverse', (req, res) => {
  try {
    const inputRoman = req.body.roman;

    if (!inputRoman) {
      res.status(400).json({ error: 'Veuillez fournir un chiffre romain dans la requête.' });
      return;
    }

    const arabic = romanToArabic(inputRoman);
    
    if (arabic === null) {
      res.status(400).json({ error: 'Chiffre romain invalide.' });
      return;
    }

    res.status(200).json({ arabic });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

function romanToArabic(roman) {
  const validRomanCharacters = 'IVXLCDM';
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

  for (const char of roman) {
    if (!validRomanCharacters.includes(char)) {
      throw new Error('Le contenu doit être des chiffres romains valides');
    }
  }

  let arabic = 0;
  let currentIndex = 0;

  while (currentIndex < roman.length) {
    const currentSymbol = roman[currentIndex];
    const currentSymbolValue = romanNumerals[currentSymbol];
    const nextSymbol = roman[currentIndex + 1];
    const nextSymbolValue = romanNumerals[nextSymbol];

    if (nextSymbol && currentSymbolValue < nextSymbolValue) {
      arabic += nextSymbolValue - currentSymbolValue;
      currentIndex += 2;
    } else {
      arabic += currentSymbolValue;
      currentIndex += 1;
    }
  }

  if (arabicToRoman(arabic) !== roman) {
    throw new Error('Chiffre romain invalide.');
  }

  return arabic;
}