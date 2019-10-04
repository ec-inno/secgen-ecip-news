import React from 'react';
import { render } from '@testing-library/react';

import * as useLogoApi from '@eci/utils/useLogoApi';
import CardImpl from './CardImpl';

describe('CardImpl', () => {
  it('render even on missing input parameters', () => {
    const { container } = render(<CardImpl />);
    expect(container).toMatchSnapshot();
  });

  it('renders default image when logo is not provided', () => {
    const props = {
      title: 'Test title',
      href: '#',
      status: 'TEST status',
      totalSupporters: 1000,
      supportLink: '#',
    };

    const { container } = render(<CardImpl {...props} />);
    expect(container).toMatchSnapshot();
  });

  it('displays custom background image when logo is provided', () => {
    jest.spyOn(useLogoApi, 'useLogoApi').mockImplementation(() => '');

    const props = {
      title: 'Test title',
      href: '#',
      status: 'TEST status',
      totalSupporters: 1000,
      supportLink: '#',
      logo: {
        id: 17215,
        name: 'converging.JPG',
        mimeType: 'image/jpeg',
        size: 100869,
      },
    };

    const { container } = render(<CardImpl {...props} />);
    expect(container).toMatchSnapshot();
  });
});
