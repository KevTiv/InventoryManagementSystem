import '../../Styles/Views/Pages/LandingPage.scss';

const NavbarLPage = () => {
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
                            <button type="button" className="landingPage-Navbar-auth-login">
                                <span>Login</span>
                            </button>
                            <button type="button" className="landingPage-Navbar-auth-signup">
                                <span>Sign up</span>
                            </button>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}

export default NavbarLPage
