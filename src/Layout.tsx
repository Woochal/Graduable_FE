import { Outlet } from "react-router-dom";
import MenuBar from "./components/common/Menubar";

const Layout = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <MenuBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
