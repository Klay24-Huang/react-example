import { renderHook } from '@testing-library/react'
import { act } from 'react'
import { useLoginForm } from './useLoginForm'
import { useAuth } from '@/app/context/AuthContext'

// Mocking the useAuth context
jest.mock('@/app/context/AuthContext', () => ({
	useAuth: jest.fn(),
}))

describe('useLoginForm', () => {
	let mockLoginUser: jest.Mock

	beforeEach(() => {
		// Clear previous mocks and ensure mockLoginUser is correctly typed
		mockLoginUser = jest.fn()
		;(useAuth as jest.Mock).mockReturnValue({
			loginUser: mockLoginUser,
		})
	})

	it('should update email and password correctly', () => {
		const { result } = renderHook(() => useLoginForm())
		const email = 'test@example.com'
		const password = 'password123'

		// Create a mock event with the necessary properties
		const mockEmailEvent = {
			target: { value: email },
			preventDefault: jest.fn(),
		} as unknown as React.ChangeEvent<HTMLInputElement>

		const mockPasswordEvent = {
			target: { value: password },
			preventDefault: jest.fn(),
		} as unknown as React.ChangeEvent<HTMLInputElement>

		// Simulate changing email and password
		act(() => {
			result.current.handleEmailChange(mockEmailEvent)
			result.current.handlePasswordChange(mockPasswordEvent)
		})

		// Check if the values are updated correctly
		expect(result.current.email).toBe(email)
		expect(result.current.password).toBe(password)
	})

	it('should validate fields and return errors if empty', () => {
		const { result } = renderHook(() => useLoginForm())

		// Create a mock FormEvent with the necessary properties
		const mockFormEvent = {
			preventDefault: jest.fn(),
			target: {}, // or any element you prefer
			currentTarget: {}, // or any element you prefer
			nativeEvent: {}, // optional, can be an empty object if not needed
			bubbles: false, // optional, set based on your event expectations
		} as unknown as React.FormEvent<HTMLFormElement>

		// Try submitting with empty fields
		act(() => {
			result.current.handleSubmit(mockFormEvent)
		})

		// Check if error messages are set
		expect(result.current.fieldErrors.email).toBe(
			'Account cannot be empty.'
		)
		expect(result.current.fieldErrors.password).toBe(
			'Password cannot be empty.'
		)
	})

	it('should call loginUser when fields are valid', async () => {
		const { result } = renderHook(() => useLoginForm())
		const email = 'test@example.com'
		const password = 'password123'

		// Create a mock event for email change
		const mockEmailEvent = {
			target: { value: email },
			preventDefault: jest.fn(),
			currentTarget: { value: email },
			nativeEvent: {}, // Mocking as a basic object
			bubbles: false,
		} as unknown as React.ChangeEvent<HTMLInputElement>

		// Create a mock event for password change
		const mockPasswordEvent = {
			target: { value: password },
			preventDefault: jest.fn(),
			currentTarget: { value: password },
			nativeEvent: {}, // Mocking as a basic object
			bubbles: false,
		} as unknown as React.ChangeEvent<HTMLInputElement>

		// Simulate changing email and password
		act(() => {
			result.current.handleEmailChange(mockEmailEvent)
			result.current.handlePasswordChange(mockPasswordEvent)
		})

		// Mock successful login
		mockLoginUser.mockResolvedValueOnce({})

		// Create a mock FormEvent for the submit handler
		const mockSubmitEvent = {
			preventDefault: jest.fn(),
			target: {},
			currentTarget: {},
			nativeEvent: {},
			bubbles: false,
		} as unknown as React.FormEvent<HTMLFormElement>

		// Submit the form
		await act(async () => {
			await result.current.handleSubmit(mockSubmitEvent)
		})

		// Check if loginUser was called with correct arguments
		expect(mockLoginUser).toHaveBeenCalledWith(email, password)
	})

	it('should set error if loginUser fails', async () => {
		const { result } = renderHook(() => useLoginForm())
		const email = 'test@example.com'
		const password = 'password123'

		// Create a mock event for email change
		const mockEmailEvent = {
			target: { value: email },
			preventDefault: jest.fn(),
			currentTarget: { value: email },
			nativeEvent: {},
			bubbles: false,
		} as unknown as React.ChangeEvent<HTMLInputElement>

		// Create a mock event for password change
		const mockPasswordEvent = {
			target: { value: password },
			preventDefault: jest.fn(),
			currentTarget: { value: password },
			nativeEvent: {},
			bubbles: false,
		} as unknown as React.ChangeEvent<HTMLInputElement>

		// Simulate changing email and password
		act(() => {
			result.current.handleEmailChange(mockEmailEvent)
			result.current.handlePasswordChange(mockPasswordEvent)
		})

		// Mock login failure
		mockLoginUser.mockRejectedValueOnce(new Error('Login failed'))

		// Create a mock FormEvent for the submit handler
		const mockSubmitEvent = {
			preventDefault: jest.fn(),
			target: {},
			currentTarget: {},
			nativeEvent: {},
			bubbles: false,
		} as unknown as React.FormEvent<HTMLFormElement>

		// Submit the form
		await act(async () => {
			await result.current.handleSubmit(mockSubmitEvent)
		})

		// Check if error message is set
		expect(result.current.error).toBe('Error: Login failed')
	})
})
