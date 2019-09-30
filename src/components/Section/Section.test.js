import React from 'react';
import renderer from 'react-test-renderer';

import * as I18nContext from '@eci/context/I18n';

import FileDownload from '../FileDownload';
import Section from './Section';

describe('Section', () => {
  it('returns an empty string when no input', () => {
    const tree = renderer.create(<Section />).toJSON();
    expect(tree).toBe('');
  });

  it('returns an empty string if only title is provided', () => {
    const tree = renderer.create(<Section title="Section title" />).toJSON();
    expect(tree).toBe('');
  });

  it('can render children even if no title is provided', () => {
    jest.spyOn(I18nContext, 'useI18nContext').mockImplementation(() => ({
      locale: 'en',
      location: {
        href: 'http://localhost:8000/en/initiatives/#1',
        pathname: '/en/initiatives/',
        hash: '#1',
      },
    }));

    const tree = renderer
      .create(
        <Section>
          <FileDownload
            file={{
              name: 'test',
              mimeType: 'text/plain',
              id: 16806,
              size: 10,
            }}
          />
        </Section>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
