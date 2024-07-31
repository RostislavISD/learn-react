import { renderHook, act } from '@testing-library/react'
import { useCounter } from '../useCounter'

test('Увеличивает значение счетчика и устанавливает новое начальное значение', () => {
  const { result, rerender } = renderHook(({ initialValue }) => useCounter(initialValue), {
    initialProps: { initialValue: 0 }
  })

  act(() => {
    result.current.increment()
  })

  expect(result.current.count).toBe(1)

  rerender({ initialValue: 10 })

  act(() => {
    result.current.reset()
  })

  expect(result.current.count).toBe(10)
})