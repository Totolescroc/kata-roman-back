const romanToArabic = require('./controller/roman.controller').romanToArabic;


  test('Conversion de I à 1', () => {
    expect(romanToArabic('I')).toBe(1);
  });
  
  test('Conversion de IX à 9', () => {
    expect(romanToArabic('IX')).toBe(9);
  });
  
  test('Conversion de MMMCMXCIX à 3999', () => {
    expect(romanToArabic('MMMCMXCIX')).toBe(3999);
  });
