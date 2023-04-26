import { render } from '@testing-library/react';

import ActionAreaCard from './action-area-card';

describe('ActionAreaCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ActionAreaCard />);
    expect(baseElement).toBeTruthy();
  });
});
