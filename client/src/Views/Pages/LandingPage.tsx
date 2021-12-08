
import '../../Styles/Views/Pages/LandingPage.scss';
import Navbar from '../../Components/Navbar/NavbarLPage';
import Hero from '../../Components/Hero/HeroLPage';
import Footer from '../../Components/Footer/FooterLPage';

type landingPageProps = {
    currentYear: number,
}

const LandingPage = ({currentYear}:landingPageProps) => {
    
    return (
        <>
            <div className="LandingPage">
                <Navbar/>
                <Hero/>
                <Footer currentYear={currentYear}/>
            </div>
        </>
    )
}

export default LandingPage
