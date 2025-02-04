"use client";
import { SignUp, useUser } from '@clerk/nextjs'

export default function Home() {
  const { user } = useUser()

  if (!user) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-50'>
        <div className='p-8 bg-white rounded-lg shadow-lg'>
          <h1 className='text-2xl font-bold text-center mb-6 text-gray-800'>Create an Account</h1>
          <SignUp routing='hash' />
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold text-gray-800'>Welcome, {user.firstName}! 🎉</h1>
        <p className='mt-2 text-gray-600'>Your account has been created successfully.</p>
      </div>
    </div>
  )
}