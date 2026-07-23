import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),
  ],

  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
      }

      // GitHub actual username, e.g. "anjan123"
      if (profile && "login" in profile) {
        token.username = profile.login as string;
      }

      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken as string;

      if (session.user) {
        session.user.id = token.sub!;
        session.user.username = token.username as string;
      }

      return session;
    },
  },
});