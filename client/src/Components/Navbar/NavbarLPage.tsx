import '../../Styles/Views/Pages/LandingPage.scss';


type landingPageNavProps = {
    showSigninModal: boolean,
    setShowSignin: React.Dispatch<React.SetStateAction<boolean>>, 
    signinMethod:string,
    setSignin: React.Dispatch<React.SetStateAction<string>>,
    handleGoogleAuthClick: () => void
}

const NavbarLPage = ({showSigninModal, setShowSignin, signinMethod, setSignin, handleGoogleAuthClick}:landingPageNavProps) => {
    
    return (
        <>
            <div className="LandingPage-Navbar">
                <nav>
                    <div className="landingPage-Navbar-logoSection">
                        <h1>
                            Inventory Management System
                        </h1>
                    </div>
                    <div className="landingPage-Navbar-authSection">
                        <div className="landingPage-Navbar-auth">
                            <button type="button" className="landingPage-Navbar-auth-login" onClick={()=>{
                                handleGoogleAuthClick();
                            }}>
                                <span>Login</span>
                            </button>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}

export default NavbarLPage
