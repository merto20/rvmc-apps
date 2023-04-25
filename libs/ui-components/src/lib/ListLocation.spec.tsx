import { render } from '@testing-library/react';

import ListLocation from './ListLocation';

describe('ListLocation', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ListLocation areaMetadata={[]} onSelectedChanged={undefined} />);
    expect(baseElement).toBeTruthy();
  });
});
