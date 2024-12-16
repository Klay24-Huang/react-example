import { Meta, StoryObj } from '@storybook/react';
import LoginForm from './LoginForm';  // Adjust the import path if necessary

const meta: Meta<typeof LoginForm> = {
  title: '登入表單',
  component: LoginForm,
}

export default {
  title: 'Components/LoginForm',
  component: LoginForm,
} 

type Story = StoryObj<typeof LoginForm>

export const Basic: Story = {
  args:{
    useLoginForm: {
      email: '',
      password: '',
      error: null,
      fieldErrors: {
      email: '',
      password: '',
    },
    handleEmailChange: () => {},
    handlePasswordChange: () => {},
    handleSubmit: () => {},
    }
  }
};

export const EmailPasswordNotFilled: Story = {
  args:{
    useLoginForm: {
      email: '',
      password: '',
      error: null,
      fieldErrors: {
      email: 'Email is required',
      password: 'Password is required',
    },
    handleEmailChange: () => {},
    handlePasswordChange: () => {},
    handleSubmit: () => {},
    }
  }
}


export const LoginFailed: Story = {
  args:{
    useLoginForm: {
      email: '',
      password: '',
      error: 'Invalid credentials',
      fieldErrors: {},
    handleEmailChange: () => {},
    handlePasswordChange: () => {},
    handleSubmit: () => {},
    }
  }
}

