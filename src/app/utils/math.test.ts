import { add } from './math'

describe('Math functions', () => {
	test('should add two numbers correctly', () => {
		expect(add(1, 2)).toBe(3)
	})

	test('should handle negative numbers', () => {
		expect(add(-1, -1)).toBe(-2)
	})
})
