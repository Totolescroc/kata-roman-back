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


  function romanToArabic(roman) {
    if (typeof roman !== 'string' || roman === '') {
      return null;
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
  
    const validRoman = /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;
  
    if (!validRoman.test(roman)) {
      return null;
    }
  
    let index = 0;
    let arabic = 0;
  
    while (index < roman.length) {
      const twoCharSymbol = roman.substring(index, index + 2);
      const oneCharSymbol = roman[index];
      const valueTwoChars = romanNumerals[twoCharSymbol];
      const valueOneChar = romanNumerals[oneCharSymbol];
  
      if (valueTwoChars != null) {
        arabic += valueTwoChars;
        index += 2;
      } else if (valueOneChar != null) {
        arabic += valueOneChar;
        index += 1;
      } else {
        return null;
      }
    }
  
    return arabic;
  }
  
  

  
  test('Conversion de 1 à I', () => {
    expect(arabicToRoman(1)).toBe('I');
  });
  
  test('Conversion de 9 à IX', () => {
    expect(arabicToRoman(9)).toBe('IX');
  });
  
  test('Conversion de 3999 à MMMCMXCIX', () => {
    expect(arabicToRoman(3999)).toBe('MMMCMXCIX');
  });
  
  test('Conversion de 0 génère une erreur', () => {
    expect(() => arabicToRoman(0)).toThrowError('Le nombre doit être compris entre 1 et 3999.');
  });
  
  test('Conversion de 4000 génère une erreur', () => {
    expect(() => arabicToRoman(4000)).toThrowError('Le nombre doit être compris entre 1 et 3999.');
  });
  
  test('Conversion d\'un texte génère une erreur', () => {
    expect(() => arabicToRoman('texte')).toThrowError('Le nombre doit être compris entre 1 et 3999.');
  });
  

  describe('Conversion de chiffres romains en nombres arabes', () => {
    test('Conversion de I à 1', () => {
      expect(romanToArabic('I')).toBe(1);
    });
  
    test('Conversion de IX à 9', () => {
      expect(romanToArabic('IX')).toBe(9);
    });
  
    test('Conversion de MMMCMXCIX à 3999', () => {
      expect(romanToArabic('MMMCMXCIX')).toBe(3999);
    });
  
    test('Conversion d\'une chaîne vide renvoie null', () => {
      expect(romanToArabic('')).toBeNull();
    });
  
    test('Conversion d\'un chiffre romain non valide doit retourner null', () => {
      expect(romanToArabic('MMMM')).toBeNull();
    });
  
    test('La conversion de IIIV n\'est pas valide et doit retourner null', () => {
      expect(romanToArabic('IIIV')).toBeNull();
    });
    
    test('La conversion de VV n\'est pas valide et doit retourner null', () => {
      expect(romanToArabic('VV')).toBeNull();
    });
  });