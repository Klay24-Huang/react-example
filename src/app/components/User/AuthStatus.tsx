"use client";

import React from 'react';
import { useAuth } from '@/app/context/AuthContext';

export default function AuthStatus(){
  const { user } = useAuth();

  return (
    <div>
      {user ? (
        <p>You are logged in!</p>
      ) : (
        <p>You are not log in.</p>
      )}
    </div>
  );
};

