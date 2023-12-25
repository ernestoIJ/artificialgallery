import React from "react";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  SignIn,
  SignUp,
  UserButton,
  useUser,
} from "@clerk/clerk-react";

import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { Home, CreatePost, PublicPage, SignUpPage, SignInPage, UserPostsPage, UserLikedPosts } from "./pages";
import { NavBar } from "./components";

const clerkPubKey = pk_test_ZmVhc2libGUtZ3VpbmVhLTg3LmNsZXJrLmFjY291bnRzLmRldiQ


function ClerkProviderWithRoutes() {
  const navigate = useNavigate();

  return (
    <ClerkProvider publishableKey={clerkPubKey} navigate={(to) => navigate(to)}>
      <Routes>
        <Route path="/" element={<PublicPage />}/>
        <Route path="/sign-in" element={<SignInPage />}/>
        <Route
          path="/sign-up"
          element={<SignUpPage />}
        />
        <Route
          path="/account"
          element={
          <>
            <SignedIn>
              <NavBar/>
              <main className='sm:p-8 px-4 py-8 w-full bg-gray-900 min-h-[calc(100vh-73px)]'>
                <Home />
              </main>
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
          }
        />
        <Route
          path="/create-post"
          element={
          <>
            <SignedIn>
              <NavBar />
              <main className='sm:p-8 px-4 py-8 w-full bg-gray-900 min-h-[calc(100vh-73px)]'>
                <CreatePost />
              </main>
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
          }
        />
        <Route
          path="/my-post"
          element={
          <>
            <SignedIn>
              <NavBar />
              <main className='sm:p-8 px-4 py-8 w-full bg-gray-900 min-h-[calc(100vh-73px)]'>
                <UserPostsPage />
              </main>
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
          }
        />

        <Route
          path="/my-likes"
          element={
          <>
            <SignedIn>
              <NavBar />
              <main className='sm:p-8 px-4 py-8 w-full bg-gray-900 min-h-[calc(100vh-73px)]'>
                <UserLikedPosts />
              </main>
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
          }
        />
      </Routes>
      
    </ClerkProvider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ClerkProviderWithRoutes />
    </BrowserRouter>
  );
}
 
export default App;

