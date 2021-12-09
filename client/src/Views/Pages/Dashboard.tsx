import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Components/Navbar/Sidebar_App';

const Dashboard = () => {
    let navigate = useNavigate();

    useEffect(()=>{
        let authToken = sessionStorage.getItem('Auth Token');
        console.log("AUTH TOKEN:__",authToken)
        if (authToken) {
            navigate('/dashboard');
        };
        if (!authToken) {
            //sessionStorage.removeItem('Auth Token');
            sessionStorage.clear();
            navigate('/');
        };
    }, [])

    return (
        <>
            <div>
                <Sidebar/>
                <div>
                    Hello Dashboard
                </div>
            </div>
        </>
    )
}

export default Dashboard
