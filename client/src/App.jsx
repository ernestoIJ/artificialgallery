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

const clerkPubKey = "pk_test_ZmVhc2libGUtZ3VpbmVhLTg3LmNsZXJrLmFjY291bnRzLmRldiQ";


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
              <NavBar/>
              <main className='sm:p-8 px-4 py-8 w-full bg-gray-900 min-h-[calc(100vh-73px)]'>
                <Home />
              </main>
          </>
          }
        />
        <Route
          path="/create-post"
          element={
          <>
              <NavBar />
              <main className='sm:p-8 px-4 py-8 w-full bg-gray-900 min-h-[calc(100vh-73px)]'>
                <CreatePost />
              </main>
          </>
          }
        />
        <Route
          path="/my-post"
          element={
          <>
              <NavBar />
              <main className='sm:p-8 px-4 py-8 w-full bg-gray-900 min-h-[calc(100vh-73px)]'>
                <UserPostsPage />
              </main>
          </>
          }
        />

        <Route
          path="/my-likes"
          element={
          <>
              <NavBar />
              <main className='sm:p-8 px-4 py-8 w-full bg-gray-900 min-h-[calc(100vh-73px)]'>
                <UserLikedPosts />
              </main>
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

