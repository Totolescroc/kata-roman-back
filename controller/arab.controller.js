module.exports.arabicToRoman = (number) => {
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
  };