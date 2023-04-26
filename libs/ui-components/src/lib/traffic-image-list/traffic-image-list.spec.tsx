import { render } from '@testing-library/react';

import TrafficImageList from './traffic-image-list';

describe('TrafficImageList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TrafficImageList />);
    expect(baseElement).toBeTruthy();
  });
});
