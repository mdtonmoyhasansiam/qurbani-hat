import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, account, profile }) {
      // প্রথম login এ Google data আসবে
      if (profile) {
        token.name = profile.name;
        token.email = profile.email;

        // Google কখনো picture দেয়, কখনো image দেয়
        token.picture =
          profile.picture || profile.image || null;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }

      return session;
    },
  },

  pages: {
    signIn: "/", // চাইলে custom login page দিতে পারো
  },
});

export { handler as GET, handler as POST };