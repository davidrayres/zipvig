import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import Apple from 'next-auth/providers/apple'
import Twitter from 'next-auth/providers/twitter'
import Facebook from 'next-auth/providers/facebook'

export const {handlers, auth, signIn, signOut} = NextAuth({
  providers: [Google, Twitter, Apple, Facebook],
})