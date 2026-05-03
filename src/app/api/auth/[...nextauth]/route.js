import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const users =
          JSON.parse(
            globalThis.localStorage?.getItem("users") || "[]"
          ) || [];

        const user = users.find(
          (u) =>
            u.email === credentials.email &&
            u.password === credentials.password
        );

        if (user) {
          return {
            name: user.name,
            email: user.email,
            image: user.photo,
          };
        }

        return null;
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user, profile }) {
      if (user) {
        token.name = user.name;
        token.email = user.email;
        token.picture = user.image;
      }

      if (profile) {
        token.name = profile.name;
        token.email = profile.email;
        token.picture =
          profile.picture || profile.image || null;
      }

      return token;
    },

    async session({ session, token }) {
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.image = token.picture;
      return session;
    },
  },
});

export { handler as GET, handler as POST };