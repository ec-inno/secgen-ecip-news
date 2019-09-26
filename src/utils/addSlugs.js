import rehype from 'rehype';
import slug from 'rehype-slug';

/**
 * Adds ID attributes to headings in an input text.
 * @param {String} input Text containing headings without ID attributes
 * @returns {Promise} The trimmed version of the input text with ID attributes.
 */
const addSlugs = input => {
  const trimmed = input.replace(/\s+/g, ' ').trim();

  return new Promise((resolve, reject) => {
    rehype()
      .data('settings', { fragment: true })
      .use(slug)
      .process(trimmed, (err, html) => {
        if (err) return reject();

        return resolve(String(html));
      });
  });
};

export default addSlugs;
