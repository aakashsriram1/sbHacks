import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: "1045663822306-va6mnndea545gvaams0ajm8eohg9ueor.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
  secret: "hihihi", // Replace with a secure secret
  pages: {
    signIn: "/auth/signin", // Customize sign-in page
    error: "/auth/error", // Error page
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Redirect to dashboard after login or stay within the same domain
      if (url.startsWith(baseUrl)) {
        return url;
      } else if (url === "/dashboard") {
        return baseUrl + "/dashboard";
      }
      // Default to home page after logout
      return baseUrl;
    },
  },
  debug: true, // Enable debug logging for troubleshooting
};

export default NextAuth(authOptions);
