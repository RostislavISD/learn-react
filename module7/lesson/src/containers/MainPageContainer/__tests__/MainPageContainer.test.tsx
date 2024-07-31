import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { MainPageContainer } from '..';

it('проверяем, что компонент рендерится', async () => {
    render(<MainPageContainer />)
})