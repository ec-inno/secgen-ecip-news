import rehype from 'rehype';
import slug from 'rehype-slug';

/**
 * Adds ID attributes to headings in an input text.
 * @param {String} input Text containing headings without ID attributes
 * @returns {Promise} The trimmed version of the input text with ID attributes.
 */
const addSlugs = input => {
  // Contents comes from Drupal, it's sanitized but contains loads of unnecessary extra white space.
  const trimmed = input.replace(/\s+/g, ' ').trim();

  return new Promise((resolve, reject) => {
    rehype()
      .data('settings', { fragment: true })
      .use(slug)
      .process(trimmed, (err, file) => {
        if (err) {
          reject();
        }
        resolve(String(file));
      });
  });
};

export default addSlugs;
