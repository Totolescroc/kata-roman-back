const express = require("express");
const router = express.Router();
const { arabicToRoman } = require('../controller/arab.controller');
const { romanToArabic } = require('../controller/roman.controller');


router.post('/convert', (req, res) => {
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

///roman to arabic

router.post('/reverse', (req, res) => {
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

module.exports = router;