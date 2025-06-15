import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MenuBar from './components/MenuBar'
import { Toaster } from 'react-hot-toast'
import LandingPage from './pages/LandingPage/LandingPage'
import Dashboard from './pages/Dashboard'
import Preview from './pages/Preview'
import MainPage from './pages/MainPage'
import UserSyncHandler from './components/UserSyncHandler'
import { RedirectToSignIn, SignedIn, SignedOut } from '@clerk/clerk-react'

const App = () => {
  return (
    <BrowserRouter>
      <UserSyncHandler />
      <MenuBar />
      <Toaster />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/preview" element={<>
          <SignedIn>
            <Preview />
          </SignedIn>
          <SignedOut>
            <RedirectToSignIn />
          </SignedOut>
        </>} />

        <Route path="/dashboard" element={
          <>
            <SignedIn>
              <Dashboard />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        } />
        <Route path="/generate" element={<>
          <SignedIn>
            <MainPage />
          </SignedIn>
          <SignedOut>
            <RedirectToSignIn />
          </SignedOut>
        </>} />

      </Routes>
    </BrowserRouter>
  )
}

export default App