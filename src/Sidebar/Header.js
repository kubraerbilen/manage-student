
//import useState hook to create menu collapse state
import React, { useState } from "react";

//import react pro sidebar components
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import { Link } from "react-router-dom";
//import icons from react icons
import { FaRegBookmark, FaGraduationCap, FaRegBell } from "react-icons/fa";
import { FiHome, FiLogOut, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import { IoLogoUsd } from "react-icons/io";
import { LuFileBarChart } from "react-icons/lu";
import { GiSettingsKnobs } from "react-icons/gi";
import { CiCircleChevLeft,CiCircleChevRight } from "react-icons/ci";

//import sidebar css from react-pro-sidebar module and our custom css 
import "react-pro-sidebar/dist/css/styles.css";
import "./Header.css";

const Header = () => {

  const [menuCollapse, setMenuCollapse] = useState(false)
  const [activeIndex, setActiveIndex] = useState(() => { 
    const initialIndex = 
      window.location.pathname === '/dashboard' ? 0 
      : window.location.pathname === '/students' ? 1 
      : window.location.pathname === '/login' ? 2
          : 0; 
    return initialIndex; 
  });

  const menuIconClick = () => {
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };
  const singOut = () => {
    setActiveIndex(2)
    localStorage.removeItem('user');
    localStorage.removeItem('authenticated');
    window.location.href = "/login";
  };
  return (
    <>
      <div className="row">
        <div className="col-12 navbar">
          <div className={menuCollapse ? (
              "closemenu"
            ) : (
              "closemenu-close"
            )} onClick={menuIconClick}>
            { }
            {menuCollapse ? (
              <CiCircleChevLeft />
            ) : (
              <CiCircleChevRight />
            )}
          </div>
          <div> <FaRegBell /></div>

        </div>
        {/* <div className="col-9" >
          <Dashboard />
        </div> */}
        <div className="col-3" id={menuCollapse ? (
              "header-close"
            ) : (
              "header"
            )}>
          { }
          <ProSidebar collapsed={menuCollapse}>
            <SidebarHeader>
              <div className="logotext p-2">
                { }
                <p>{menuCollapse ? "MC" : "MANAGE COURSES"}</p>
              </div>

            </SidebarHeader>

            <SidebarContent>
              {menuCollapse ? (
                <div className="user-image mb-2" >
                </div>
              ) : (
                <div className="user-image mb-2" >
                  <img src={require('../images.png')} style={{ width: 128, height: 128, borderRadius: 65 }} />
                </div>
              )}
              <h3 className="user-name">John Doe</h3>
              <h3 className="title">Admin</h3>
              <Menu iconShape="none">
                <MenuItem active={activeIndex === 0} icon={<FiHome />}>
                  Home <Link to="/dashboard" className="link" onClick={() => setActiveIndex(0)} />
                </MenuItem>
                <MenuItem icon={<FaRegBookmark />}>Course</MenuItem>
                <MenuItem active={activeIndex === 1}  icon={<FaGraduationCap />}  >Students <Link to="/students" className="link" onClick={() => setActiveIndex(1)} /></MenuItem>
                <MenuItem icon={<IoLogoUsd />}>Payment</MenuItem>
                <MenuItem icon={<LuFileBarChart />}>Report</MenuItem>
                <MenuItem icon={<GiSettingsKnobs />}>Settings</MenuItem>
              </Menu>
            </SidebarContent>
            <SidebarFooter>
              <Menu iconShape="square">
                <MenuItem active={activeIndex === 2}  icon={<FiLogOut />} onClick={singOut}>Logout</MenuItem>
              </Menu>
            </SidebarFooter>
          </ProSidebar>
        </div>
        
      </div>
    </>
  );
};

export default Header;
