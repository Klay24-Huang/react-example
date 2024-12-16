// hooks/useLoginForm.ts
import { useState } from 'react'
import { useAuth } from '@/app/context/AuthContext'

export function useLoginForm() {
	const { loginUser } = useAuth()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const [fieldErrors, setFieldErrors] = useState({ email: '', password: '' })

	const validateFields = () => {
		const errors = { email: '', password: '' }

		if (!email.trim()) errors.email = 'Account cannot be empty.'
		if (!password.trim()) errors.password = 'Password cannot be empty.'

		setFieldErrors(errors)
		return Object.values(errors).every((error) => error === '')
	}

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value)
		setFieldErrors((prev) => ({ ...prev, email: '' }))
	}

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value)
		setFieldErrors((prev) => ({ ...prev, password: '' }))
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!validateFields()) return

		try {
			await loginUser(email, password)
		} catch (err) {
			setError(`${err}`)
		}
	}

	return {
		email,
		password,
		error,
		fieldErrors,
		handleEmailChange,
		handlePasswordChange,
		handleSubmit,
	}
}
// add some change
