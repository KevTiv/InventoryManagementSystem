import {useEffect, useState} from 'react';

import '../Styles/Views/App.scss';
import LandingPage from './Pages/LandingPage';

function App() {
  
  const [currentYear, setCurrentYear] = useState<number>(0);
  useEffect(() => {
    const currentYear = ()=>{
      const curDate = new Date();
      setCurrentYear(curDate.getFullYear());
    }

    currentYear();
  },[]);
  return (
    <div className="App">
      <LandingPage currentYear={currentYear}/>
    </div>
  );
}

export default App;
