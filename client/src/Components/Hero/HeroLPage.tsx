import img1 from '../../Utils/Img/img05.jpg';
import img2 from '../../Utils/Img/img03.jpg';

const HeroLPage = () => {
    return (
        <>
            <div className="LandingPage-Hero">
                <div className="LandingPage-Hero-img-section">
                    <div className="LandingPage-Hero-img">
                        <img src={img1} alt="Landing page hero images" />
                    </div>
                    <div className="LandingPage-Hero-img">
                        <img src={img2} alt="Landing page hero images"/>
                    </div>
                </div>
                <div className="LandingPage-Hero-cta">
                    <h2>
                        Inventory made easy!
                    </h2>
                    <p>
                        <ul>
                            <li>
                                Update your stock through simple steps.
                            </li>
                            <li>
                                Access your stock information in real time.
                            </li>
                            <li>
                                Connect through secure authentification channel.
                            </li>
                        </ul>
                    </p>
                </div>
            </div>
        </>
    )
}

export default HeroLPage
