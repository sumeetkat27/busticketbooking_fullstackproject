import Header from "../components/Header";
import ManagerNavigation from "./../components/ManagerNavigation";
import { useHistory } from "react-router-dom";

const ManagerHomeScreen = (props) => {
  const history = useHistory();
  const user = localStorage.getItem('user')
  if(user === null||user===undefined) 
           { history.push("/signin");}
  
  return (
    <div>
    
      <div>
      <ManagerNavigation />
      <Header title="Home Screen" />
      <section className="destinations">
        <div className="grid">
          <h1>WELCOME TO MANAGER PAGE</h1>
        </div>
      </section>
    </div>

    </div>
  );
};

export default ManagerHomeScreen;
