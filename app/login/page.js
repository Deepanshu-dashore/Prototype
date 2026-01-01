import LoginContent from "../../src/components/auth/LoginContent";

export const metadata = {
  title: "Login | CC Matting Admin",
  description: "Secure login for CC Matting administrative dashboard.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginPage() {
  return <LoginContent />;
}
