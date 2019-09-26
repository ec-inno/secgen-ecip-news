import addSlugs from '../addSlugs';

describe('addSlugs utlity', () => {
  it('handles h1 tag', async () => {
    const input = '<h1>foo</h1>';

    const result = await addSlugs(input);
    expect(result).toBe('<h1 id="foo">foo</h1>');
  });

  it('handles h2 tag', async () => {
    const input = '<h2>bar</h2>';

    const result = await addSlugs(input);
    expect(result).toBe('<h2 id="bar">bar</h2>');
  });

  it('handles multiple tags at the same time', async () => {
    const input =
      '<h1>rehype</h1><h2>Intro</h2><p>rehype is an ecosystem of plugins for processing HTML to do all kinds of things: format it, minify it, or wrap it programmatically into a document.</p>';

    const result = await addSlugs(input);
    expect(result).toBe(
      `<h1 id="rehype">rehype</h1><h2 id="intro">Intro</h2><p>rehype is an ecosystem of plugins for processing HTML to do all kinds of things: format it, minify it, or wrap it programmatically into a document.</p>`
    );
  });
});
