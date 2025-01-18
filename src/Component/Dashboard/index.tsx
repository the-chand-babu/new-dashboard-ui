import FormsDetails from "../Form";
import Header from "../Header";
import LeftSidebar from "../LeftSidebar";
import "./style.scss";

const Dashboard = () => {
  return (
    <div className="dashboard-main-container">
      <LeftSidebar />
      <div className="container-wrapper">
        <Header />
        <FormsDetails />
      </div>
    </div>
  );
};

export default Dashboard;
