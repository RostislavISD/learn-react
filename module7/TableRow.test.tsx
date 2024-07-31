import { render } from '@testing-library/react';
import { TableRow } from '../TableRow';
import { IPizza } from '../../../types/pizza';

describe('Тест компонента TableRow', () => {
  test('Проверка корректного рендеринга элемента списка', () => {
    const { container } = renderComponent();

    expect(container).toMatchSnapshot();
  })

})

const defaultProps = {
  onPizzaDelete: () => {},
  pizza: {
    id: 1,
    name: 'Вкусная пицца',
    dough: 'тонкое',
    size: 15,
    ingredients: [
      {
        id: 2,
        name: 'бекон',
        kcal: 350,
      },
      { 
        id: 3,
        name: 'сыр',
        kcal: 500,
      }
    ]
  } as IPizza,
};

const renderComponent = (props = {}) => {
  return render(
    <table>
      <tbody>
        <TableRow {...defaultProps} {...props} />
      </tbody>
    </table>)
}