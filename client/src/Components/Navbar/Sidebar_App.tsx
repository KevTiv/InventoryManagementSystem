import '../../Styles/Views/Pages/DashboardPage.scss'

type sidebarProps ={
    onClickShowDashboardComponent: () => void,
    onClickShowProductComponent: () => void,
    onClickShowInventoryComponent: () => void,
    onClickShowBrandComponent: () => void
}
const Sidebar_App = ({onClickShowDashboardComponent, onClickShowProductComponent, 
    onClickShowInventoryComponent, onClickShowBrandComponent}:sidebarProps) => {
    return (
        <>
            <div className="sidebar-container">
                <div className="Sidebar-logo-wrapper">
                    <h1 className="sidebar-logo-title">
                        Inventory Management System
                    </h1>
                </div>
                <ul className="sidebar-option-wrapper">
                    <li className="sidebar-option" onClick={onClickShowDashboardComponent}>
                        <span>
                            Dashboard
                        </span>
                    </li>
                    <li className="sidebar-option" onClick={onClickShowInventoryComponent}>
                        <span>
                            Inventory
                        </span>
                    </li>
                    <li className="sidebar-option" onClick={onClickShowProductComponent}>
                        <span>
                            Product
                        </span>
                    </li>
                    <li className="sidebar-option" onClick={onClickShowBrandComponent}>
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
