import upperCaseFirstChar from '../upperCaseFirstChar';

describe('upperCaseFirstChar utlity', () => {
  it('ignores numbers', () => {
    const result = upperCaseFirstChar(1);
    expect(result).toBe(1);
  });

  it('ignores objects', () => {
    const result = upperCaseFirstChar({ foo: 'bar' });
    expect(result).toEqual({ foo: 'bar' });
  });

  it('ignores arrays', () => {
    const result = upperCaseFirstChar(['foo']);
    expect(result).toEqual(['foo']);
  });

  it('formats strings of one word', () => {
    const result = upperCaseFirstChar('FOO');
    expect(result).toEqual('Foo');
  });

  it('formats strings of several words', () => {
    const result = upperCaseFirstChar('FOO BAR BAZ');
    expect(result).toEqual('Foo bar baz');
  });

  it('formats strings split by underscores', () => {
    const result = upperCaseFirstChar('FOO_BAR');
    expect(result).toEqual('Foo bar');
  });

  it('formats strings split by underscores', () => {
    const result = upperCaseFirstChar('FOO_BAR_BAZ');
    expect(result).toEqual('Foo bar baz');
  });
});
