import Home from "../../Pages/Home/Home";
import Dashboard from "../../Pages/Dashboard/Dashboard";
import About from "../../Pages/About/About";


const routes = [
    { 
      path:"/", 
      component:Home,
      name: "Home screen",
      protected: false
    },
    { 
      path:"/About/About",
      component:About,
      name: "About",
      protected: true
    },
    { 
      path:"/Dashboard/Dashboard",
      component:Dashboard,
      name: "Dashboard",
      protected: true
    }
];
    

export default routes;