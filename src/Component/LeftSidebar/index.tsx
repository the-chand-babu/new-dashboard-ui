import "./style.scss";

const LeftSidebar = () => {
  return (
    <div id="left-sidebar-container">
      <div className="sidebar-header">
        <span className="sidebar-title">Housing Mantra</span>
        <span className="sidebar-role">Super Admin</span>
      </div>
      <ul className="sidebar-menu">
        <li className="menu-item">Stats</li>
        <li className="menu-item">Admin</li>
        <li className="menu-item">Agent</li>
        <li className="menu-item">Owner</li>
        <li className="menu-item">Team</li>
        <li className="menu-item">Developer</li>
        <li className="menu-item">Project</li>
        <li className="menu-item">Property</li>
        <li className="menu-item">Listing</li>
        <li className="menu-item">Leads</li>
        <li className="menu-item">Customer</li>
        <li className="menu-item">Analytics</li>
        <li className="menu-item">Sales</li>
        <li className="menu-item">Income Generated</li>
        <li className="menu-item">Site Visit</li>
        <li className="menu-item">Booking</li>
      </ul>
    </div>
  );
};

export default LeftSidebar;
