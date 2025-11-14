import NextAuth from 'next-auth';
import { AuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';

export const authOptions: AuthOptions = {
  // 1. Tell NextAuth to use our Prisma database
  adapter: PrismaAdapter(prisma),

  // 2. Define our "login strategy" (email/password)
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      
      // 3. This is the "Bouncer" logic
      async authorize(credentials) {
        // Check if email and password were provided
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Find the user in our database
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        // If no user found, deny access
        if (!user) {
          return null;
        }

        // Check if the password matches
        // We use bcrypt to compare the plain-text password with the
        // hashed password we stored in the database.
        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        // If password is not valid, deny access
        if (!isPasswordValid) {
          return null;
        }

        // 4. If everything is good, return the user object
        // This tells NextAuth the login was successful.
        return user;
      },
    }),
  ],

  // 5. Tell NextAuth how to handle sessions
  session: {
    strategy: 'jwt', // We'll use JSON Web Tokens
  },

  // 6. Add the user's ID to their session token
  // This is SUPER important. It lets us know *who* is logged in
  // when they try to create a new article.
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // Add the user's DB 'id' to the token
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id; // Add the 'id' to the session object
      }
      return session;
    },
  },

  // 7. Define our custom login page URL
  pages: {
    signIn: '/login',
    // We can also add pages for sign-up, errors, etc.
  },
};

// 8. Export the handler
// This creates all the /api/auth/... endpoints
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };