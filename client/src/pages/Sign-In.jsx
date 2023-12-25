import { SignIn } from "@clerk/clerk-react";
 
function SignInPage() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <SignIn appearance={{
          elements: {
            formButtonPrimary: "bg-[#6469ff] hover:bg-violet-500",
          },
        }} afterSignInUrl="/account" redirectUrl="/account" signUpUrl="/sign-up"/>
    </div>
  );
}

export default SignInPage;
