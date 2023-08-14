import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import _ from 'lodash';

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'example@ledonhome.com' },
      },
      async authorize(credentials, req) {
        const user = { email: credentials.username };

        if (_.result(user, 'email')) {
          return user;
        }
        return null;
      },
    }),
  ],
  // pages: {
  //   signIn: '/auth/signin',
  //   signOut: '/auth/signout',
  //   error: '/auth/error', // Error code passed in query string as ?error=
  //   verifyRequest: '/auth/verify-request', // (used for check email message)
  //   newUser: '/auth/new-user', // New users will be directed here on first sign in (leave the property out if not of interest)
  // },
};

export default NextAuth(authOptions);
