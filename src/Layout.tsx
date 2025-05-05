import { Outlet } from "react-router-dom";
import MenuBar from "./components/common/Menubar";

const Layout = () => {
  return (
    <div style={{ width: "100vw", height: "100vh", position: "fixed", top: 0, left: 0 }}>
      <MenuBar/>
      <main style={{ flexGrow: 1, height: "100%"}}  >
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
