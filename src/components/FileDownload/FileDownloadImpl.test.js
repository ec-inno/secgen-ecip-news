import React from 'react';
import { render } from '@testing-library/react';

import * as useDocumentApi from '@eci/utils/useDocumentApi';
import * as I18nContext from '@eci/context/I18n';
import FileDownloadImpl from './FileDownloadImpl';

describe('FileDownloadImpl', () => {
  it('does not render on missing input', () => {
    const { container } = render(<FileDownloadImpl />);
    expect(container).toMatchSnapshot();
  });

  it('does not render anything on missing id', () => {
    const { container } = render(<FileDownloadImpl file={{}} />);
    expect(container).toMatchSnapshot();
  });

  it('renders correctly provided an input', () => {
    jest.spyOn(I18nContext, 'useI18nContext').mockImplementation(() => ({
      locale: 'en',
      location: {
        href: 'http://localhost:8000/en/initiatives/#1',
        pathname: '/en/initiatives/',
        hash: '#1',
      },
    }));

    const props = {
      file: {
        name: 'test',
        mimeType: 'text/plain',
        id: 16806,
        size: 10,
      },
    };

    const { container } = render(<FileDownloadImpl {...props} />);
    expect(container).toMatchSnapshot();
  });

  it('renders file extension only if mimeType is actually useful', () => {
    jest.spyOn(I18nContext, 'useI18nContext').mockImplementation(() => ({
      locale: 'en',
      location: {
        href: 'http://localhost:8000/en/initiatives/#1',
        pathname: '/en/initiatives/',
        hash: '#1',
      },
    }));

    const props = {
      file: {
        name: 'test',
        mimeType: 'unknown',
        id: 16806,
        size: 10,
      },
    };

    const { container } = render(<FileDownloadImpl {...props} />);
    expect(container).toMatchSnapshot();
  });

  it('renders language label when provided', () => {
    jest.spyOn(I18nContext, 'useI18nContext').mockImplementation(() => ({
      locale: 'en',
      location: {
        href: 'http://localhost:8000/en/initiatives/#1',
        pathname: '/en/initiatives/',
        hash: '#1',
      },
    }));

    const props = {
      file: {
        language: 'en',
        name: 'test',
        mimeType: 'text/plain',
        id: 16806,
        size: 10,
      },
    };

    const { container } = render(<FileDownloadImpl {...props} />);
    expect(container).toMatchSnapshot();
  });

  it('can render a message for alternative language versions when a file is not available', () => {
    jest.spyOn(I18nContext, 'useI18nContext').mockImplementation(() => ({
      locale: 'en',
      location: {
        href: 'http://localhost:8000/en/initiatives/#1',
        pathname: '/en/initiatives/',
        hash: '#1',
      },
    }));

    const props = {
      file: {
        otherLanguages: ['bg', 'cs'],
      },
    };

    const { container } = render(<FileDownloadImpl {...props} />);
    expect(container).toMatchSnapshot();
  });

  it('renders an error message when file is not reachable', () => {
    jest.spyOn(useDocumentApi, 'useDocumentApi').mockImplementation(() => ({
      response: '',
      isLoading: false,
      error: { message: 'File not found.' },
    }));

    const props = {
      file: {
        name: 'test',
        mimeType: 'text/plain',
        id: 16806,
        size: 10,
      },
    };

    const { container } = render(<FileDownloadImpl {...props} />);
    expect(container).toMatchSnapshot();
  });
});
