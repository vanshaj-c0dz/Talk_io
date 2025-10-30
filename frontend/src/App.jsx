import React from 'react'
import { Routes , Route, Navigate } from 'react-router'
import HomePage from "./pages/HomePage.jsx"
import Signup from "./pages/Signup.jsx"
import Login from "./pages/Login.jsx"
import Notifications from "./pages/Notifications.jsx"
import Call from "./pages/Call.jsx"
import ChatPage from "./pages/ChatPage.jsx"
import Onboarding from "./pages/Onboarding.jsx"
import toast, { Toaster } from 'react-hot-toast'

 
import PageLoader from './components/PageLoader.jsx'
 
import { useAuthUser } from './hooks/useAuthUser.js'
import Layout from './components/Layout.jsx'
import { useThemeStore } from './store/useThemeStore.js'

const App = () => {

 const {isLoading , authUser} = useAuthUser()

 const {theme} = useThemeStore()

 const isAuthenticated = Boolean(authUser)
 const isOnboarded = authUser?.isOnboarded

  

  if(isLoading) return <PageLoader/>
  
 
  return (
    <div className='h-screen' data-theme={theme}>
       
      <Routes>
        <Route path="/" element={isAuthenticated && isOnboarded?(
          <Layout showSidebar={true}>
            <HomePage/>
          </Layout>
        ) : (
          <Navigate to={!isAuthenticated ?  "/login" : "/onboarding"}/>
        )}/>
        
        <Route path="/signup" element={!isAuthenticated ? <Signup/> : <Navigate to={isOnboarded ? "/" : "/onboarding"}/>}/>
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to={isOnboarded ? "/" : "/onboarding"}/>}/>
        <Route path="/notifications" element={isAuthenticated && isOnboarded ? (
          <Layout showSidebar={true}>
            <Notifications/>
          </Layout>
        ) : (
          <Navigate to={!isAuthenticated ?  "/login" : "/onboarding"}/>
        )}/>
        <Route path="/chat/:id" element={isAuthenticated && isOnboarded ? (
          <Layout >
            <ChatPage/>
          </Layout>
        ) : (
          <Navigate to={!isAuthenticated ?  "/login" : "/onboarding"}/>
        )}/>
        <Route path="/call/:id" element={isAuthenticated && isOnboarded ? (
          
            <Call/>
         
        ) : (
          <Navigate to={!isAuthenticated ?  "/login" : "/onboarding"}/>
        )}/>
        <Route path="/onboarding" element={isAuthenticated? (
          !isOnboarded ? (<Onboarding/>) : (<Navigate to="/"/>)
        ) : (<Navigate to="/login"/>)}/>
      </Routes>
      <Toaster/> 
      
    </div>
  )
}

export default App
