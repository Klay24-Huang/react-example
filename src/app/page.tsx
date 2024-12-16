'use client'

import LoginForm from "@/app/components/User/LoginForm";
import AuthStatus from '@/app/components/User/AuthStatus';
import Divider from '@/app/components/Shared/Divider';
import { useLoginForm } from '@/app/hooks/user/useLoginForm';

export default function Home(){
  return (
    <div>
      <h1>Login</h1>
      <LoginForm useLoginForm={useLoginForm()} /> 
      <Divider/>
      <AuthStatus />
    </div>
  );
}
