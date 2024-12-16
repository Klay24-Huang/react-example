import axios from 'axios'

export const login = async (email: string, password: string) => {
	try {
		// 發送實際的API請求
		const response = await axios.post('/api/login', { email, password })

		// 假設API返回的格式為 { user: string, token: string }
		if (response.data && response.data.token) {
			return { user: response.data.user, token: response.data.token }
		} else {
			throw new Error('Invalid credentials')
		}
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message)
		} else {
			// Handle non-Error case
			console.error('An unknown error occurred')
		}
	}
}
