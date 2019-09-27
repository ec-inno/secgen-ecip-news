import React from 'react';
import { render } from '@testing-library/react';

import * as useLogoApi from '@eci/utils/useLogoApi';
import ResultImpl from './ResultImpl';

describe('ResultImpl', () => {
  it('render even on missing input parameters', () => {
    const { container } = render(<ResultImpl />);
    expect(container).toMatchSnapshot();
  });

  it('renders default image when logo is not provided', () => {
    const props = {
      title: 'Test title',
      href: '#',
      status: 'TEST status',
      pubRegNum: '1234',
    };

    const { container } = render(<ResultImpl {...props} />);
    expect(container).toMatchSnapshot();
  });

  it('displays custom background image when logo is provided', () => {
    jest.spyOn(useLogoApi, 'useLogoApi').mockImplementation(() => '');

    const props = {
      title: 'Test title',
      href: '#',
      status: 'TEST status',
      pubRegNum: '1234',
      logo: {
        id: 17215,
        name: 'converging.JPG',
        mimeType: 'image/jpeg',
        size: 100869,
      },
    };

    const { container } = render(<ResultImpl {...props} />);
    expect(container).toMatchSnapshot();
  });
});
