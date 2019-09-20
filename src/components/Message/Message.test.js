import React from 'react';
import renderer from 'react-test-renderer';
import Message from './Message';

describe('Message', () => {
  it('renders correctly', () => {
    const props = {
      close: null,
      variant: 'warning',
      icon: {
        shape: 'notifications--warning',
        size: 'l',
      },
      title: 'Disclaimer',
      description:
        'The contents on this page are the sole responsibility of the organisers of the initiatives. The texts reflect solely the views of their authors and can in no way be taken to reflect the views of the European Commission.',
    };
    const tree = renderer.create(<Message {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
