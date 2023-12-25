import { SignUp } from "@clerk/clerk-react";
 
function SignUpPage() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
       <SignUp appearance={{
          elements: {
            formButtonPrimary: "bg-[#6469ff] hover:bg-violet-500",
          },
        }} afterSignUpUrl="/account" redirectUrl="/account" signInUrl="sign-in"/>
    </div>
  );
}

export default SignUpPage;