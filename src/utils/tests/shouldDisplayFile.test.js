import shouldDisplayFile from '../shouldDisplayFile';

describe('shouldDisplayFile utlity', () => {
  it('missing input is not acceptable', () => {
    const result = shouldDisplayFile();
    expect(result).toBe(false);
  });

  it('string input is not acceptable', () => {
    const result = shouldDisplayFile('foo');
    expect(result).toBe(false);
  });

  it('number input is not acceptable', () => {
    const result = shouldDisplayFile(1);
    expect(result).toBe(false);
  });

  it('boolean input is not acceptable', () => {
    const result = shouldDisplayFile(true);
    expect(result).toBe(false);
  });

  it('array input is not acceptable', () => {
    const result = shouldDisplayFile(['file']);
    expect(result).toBe(false);
  });

  it('an object/map of languages is not acceptable', () => {
    const file = { otherLanguages: { something: 'en' } };
    const result = shouldDisplayFile(file);
    expect(result).toBe(false);
  });

  it('object with an id is acceptable', () => {
    const file = { id: 1 };
    const result = shouldDisplayFile(file);
    expect(result).toBe(true);
  });

  it('an array of languages is acceptable', () => {
    const file = { otherLanguages: ['en'] };
    const result = shouldDisplayFile(file);
    expect(result).toBe(true);
  });
});
