import { render } from '@testing-library/react';

import ListLocation from './list-location';

describe('ListLocation', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ListLocation />);
    expect(baseElement).toBeTruthy();
  });
});
