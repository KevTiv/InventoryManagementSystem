import {useEffect, useState} from 'react';
import { Route, Routes } from 'react-router-dom';
import '../Styles/Views/App.scss';
import LandingPage from './Pages/LandingPage';
import Dashboard from './Pages/Dashboard';
import {handleGoogleAuth} from '../Provider/AuthProvider';
import {useNavigate} from 'react-router-dom';
function App() {
  
  let navigate = useNavigate();
  const [currentYear, setCurrentYear] = useState<number>(0);
  const [showSigninModal, setShowSignin] = useState(false);
  const [signinMethod, setSignin] = useState("");
  const [token, setToken] = useState<string|null>();

  const checkToken = ()=>{
    let authToken = sessionStorage.getItem('Auth Token');
    setToken(authToken)
    if (token !== null){
        navigate('/dashboard');
    }else{
        //navigate('/');
        window.location.reload();
    }
  }
  const handleGoogleAuthClick = ()=>{
      handleGoogleAuth(checkToken);
  }

  useEffect(() => {
    const currentYear = ()=>{
      const curDate = new Date();
      setCurrentYear(curDate.getFullYear());
    }

    currentYear();
  },[]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" 
          element={ 
            <LandingPage currentYear={currentYear} showSigninModal={showSigninModal} setShowSignin={setShowSignin} 
              signinMethod={signinMethod} setSignin={setSignin} handleGoogleAuthClick={handleGoogleAuthClick}/>}/> 
        <Route path="/dashboard" element={ <Dashboard/> } />
      </Routes>
      
    </div>
  );
}

export default App;
