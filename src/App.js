import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { firebaseAuth } from './backend/firebaseHandler';
import AuthPage from './pages/Auth/authPage.component';
import EstimationDetails from './pages/estimationDetails/estimationDetails.component';
import HomePage from './pages/Home/homePage.component';
import OperatorEntries from './pages/OperatorEntries/operatorEntries.component';

function App() {

  const [currentState, setCurrentState] = useState("SPLASH")

  useEffect(() => {
    // firebaseAuth.signOut()
    onAuthStateChanged(firebaseAuth, (user)=>{
      if(user) {
        setCurrentState("HOME")
      } else {
        setCurrentState("LOGIN")
      }
    })
  }, [])

  if (currentState === "SPLASH") {
    return(
      <div></div>
    )
  }

  if (currentState === "LOGIN") {
    return(
      <AuthPage />
    )
  }

  return (
    <div className="App">
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/:estimationId' element={<EstimationDetails />} />
          <Route path='/Entries' element={<OperatorEntries />} />
        </Routes>
    </div>
  );
}

export default App;
