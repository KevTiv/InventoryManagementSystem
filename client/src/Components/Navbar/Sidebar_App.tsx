import '../../Styles/Views/Pages/DashboardPage.scss'

const Sidebar_App = () => {
    return (
        <>
            <div className="sidebar-container">
                <div className="Sidebar-logo-wrapper">
                    <h1 className="sidebar-logo-title">
                        Inventory Management System
                    </h1>
                </div>
                <ul className="sidebar-option-wrapper">
                    <li className="sidebar-option">
                        <span>
                            Dashboard
                        </span>
                    </li>
                    <li className="sidebar-option">
                        <span>
                            Product
                        </span>
                    </li>
                    <li className="sidebar-option">
                        <span>
                            Inventory
                        </span>
                    </li>
                    <li className="sidebar-option">
                        <span>
                            Brand
                        </span>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default Sidebar_App
