
import '../../Styles/Views/Pages/LandingPage.scss';
import Navbar from '../../Components/Navbar/NavbarLPage';
import Hero from '../../Components/Hero/HeroLPage';
import Footer from '../../Components/Footer/FooterLPage';
import {handleGoogleAuth} from '../../Provider/AuthProvider';

type landingPageProps = {
    currentYear: number,
    showSigninModal: boolean,
    setShowSignin: React.Dispatch<React.SetStateAction<boolean>>, 
    signinMethod:string,
    setSignin: React.Dispatch<React.SetStateAction<string>>,
    handleGoogleAuthClick: () => void
}

const LandingPage = ({currentYear, showSigninModal, setShowSignin, signinMethod, setSignin, handleGoogleAuthClick}:landingPageProps) => {
    

    return (
        <>
            <div className="LandingPage">
                <Navbar showSigninModal={showSigninModal} setShowSignin={setShowSignin} signinMethod={signinMethod} setSignin={setSignin} handleGoogleAuthClick={handleGoogleAuthClick}/>
                <Hero/>
                <Footer currentYear={currentYear}/>
            </div>
        </>
    )
}
export default LandingPage
