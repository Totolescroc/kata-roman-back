const arabicToRoman = require('./app');

  
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
  