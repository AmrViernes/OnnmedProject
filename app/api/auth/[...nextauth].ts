// pages/api/auth/[...nextauth].ts
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { connectToDatabase } from '../../../utils/mongodb'; 
import bcrypt from 'bcrypt';

export default NextAuth({
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        try {
          const { db } = await connectToDatabase(); 
          const usersCollection = db.collection('users'); 

          const user = await usersCollection.findOne({ email: credentials.email });

          if (user && (await bcrypt.compare(credentials.password, user.password))) {
            return Promise.resolve(user);
          } else {
            return Promise.resolve(null);
          }
        } catch (error) {
          console.error('MongoDB error:', error);
          return Promise.resolve(null);
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt(token, user) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
  },
});
