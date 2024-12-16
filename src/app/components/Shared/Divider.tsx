"use client";

import React from 'react';

export default function Divider({ className = '' }) {
  return <hr className={`border-gray-300 ${className}`} />;
}
