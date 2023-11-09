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



  return arabic;
}


  test('Conversion de I à 1', () => {
    expect(romanToArabic('I')).toBe(1);
  });
  
  test('Conversion de IX à 9', () => {
    expect(romanToArabic('IX')).toBe(9);
  });
  
  test('Conversion de MMMCMXCIX à 3999', () => {
    expect(romanToArabic('MMMCMXCIX')).toBe(3999);
  });
