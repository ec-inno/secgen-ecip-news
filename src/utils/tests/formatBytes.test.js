import formatBytes from '../formatBytes';

describe('formatBytes utlity', () => {
  it('handles only numbers', () => {
    const result = formatBytes('foo');
    expect(result).toBe('0 Bytes');
  });

  it('handles zero', () => {
    const result = formatBytes(0);
    expect(result).toBe('0 Bytes');
  });

  it('handles negative numbers', () => {
    const result = formatBytes(-100);
    expect(result).toBe('0 Bytes');
  });

  it('handles kilobytes', () => {
    const result = formatBytes(1024);
    expect(result).toBe('1 KB');
  });

  it('handles megabytes', () => {
    const result = formatBytes(10000000);
    expect(result).toBe('9.54 MB');
  });
});
