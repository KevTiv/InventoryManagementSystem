import {Icon} from '@iconify/react';
import githubIcon from '@iconify/icons-mdi/github';
import linkedinIcon from '@iconify/icons-mdi/linkedin';


type footerProps ={
    currentYear: number;
}

const FooterLPage = ({currentYear}:footerProps) => {
    const linkedinHrefLink:string = "https://rw.linkedin.com/in/kevin-tivert";
    const githubHrefLink:string = "https://github.com/KevTiv/inventoryManagementSystem";

    return (
        <>
            <div className="LandingPage-Footer">
                <div className=" footer-container-wrapper ">
                    <div>
                        <p>Copyright © {currentYear.toString()} Kevin Tivert</p>
                        <p>All rights reserved</p>
                        <div className="footer-socials-container">
                            <div className="social-link-container ">
                                <a href={githubHrefLink} target="_blank" rel="noreferrer">
                                    <Icon icon={githubIcon} className="icon-marke"/>
                                </a>
                            </div>
                            <div className="social-link-container ">
                                <a href={linkedinHrefLink} target="_blank" rel="noreferrer">
                                    <Icon icon={linkedinIcon} className="icon-marke"/>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FooterLPage;