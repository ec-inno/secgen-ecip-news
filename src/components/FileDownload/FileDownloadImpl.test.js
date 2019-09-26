import React from 'react';
import { render } from '@testing-library/react';

import * as useDocumentApi from '@eci/utils/useDocumentApi';
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
