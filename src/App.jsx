import React from 'react'
import './index.css'

// firebase

import { auth } from './utils/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

function App() {

  const [user] = useAuthState(auth)

  return (
    <>
      <div>
        <Main/>
      </div>
    </>
  )
}

export default App
