import React from 'react';

interface LoginFormProps {
  useLoginForm: {
    email: string;
    password: string;
    error: string | null;
    fieldErrors: { email?: string; password?: string };
    handleEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handlePasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (event: React.FormEvent) => void;
  };
}

export default function LoginForm({ useLoginForm }: LoginFormProps) {
  const {
    email,
    password,
    error,
    fieldErrors,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
  } = useLoginForm;

  return (
    <form onSubmit={handleSubmit} className="space-y-6" data-testid="login-form">
      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          className={`block w-full px-4 py-2 border rounded-md ${
            fieldErrors.email ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {fieldErrors.email && (
          <p className="mt-1 text-sm text-red-500">{fieldErrors.email}</p>
        )}
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          className={`block w-full px-4 py-2 border rounded-md ${
            fieldErrors.password ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {fieldErrors.password && (
          <p className="mt-1 text-sm text-red-500">{fieldErrors.password}</p>
        )}
      </div>
      <div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Login
        </button>
      </div>
      {error && (
        <div>
          <p className="mt-4 text-center text-sm text-red-500">{error}</p>
        </div>
      )}
    </form>
  );
}
