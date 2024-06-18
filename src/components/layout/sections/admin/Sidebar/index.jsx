import React, { useState } from "react";
import {
  BsCart3,
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsListCheck,
  BsMenuButtonWideFill,
  BsFillGearFill,
} from "react-icons/bs";
import classNames from "classnames/bind";
import styles from "./style.module.scss";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  return (
    <aside
      id="sidebar"
      className={cx("sidebar", openSidebarToggle ? "sidebar-responsive" : "")}
    >
      <div className={cx("sidebar-title")}>
        <div style={{ color: "#fff" }} className={cx("sidebar-brand")}>
          <BsCart3 className={cx("icon_header")} /> SHOP
        </div>
        <span className={cx("icon", "close_icon")} onClick={OpenSidebar}>
          X
        </span>
      </div>
      
      <ul className={cx("sidebar-list")}>
        <li className={cx("sidebar-list-item")}>
          <Link to="/Admin/">
            <BsGrid1X2Fill className={cx("icon")} /> Dashboard
          </Link>
        </li>
        <li className={cx("sidebar-list-item")}>
          <Link to="/Admin/Blog">
            <BsFillArchiveFill className={cx("icon")} /> Blogs
          </Link>
        </li>

        <li className={cx("sidebar-list-item")}>
          <Link to="/Admin/Product">
            <BsGrid1X2Fill className={cx("icon")} /> Products
          </Link>
        </li>
        <li className={cx("sidebar-list-item")}>
          <Link to="/Admin/Trademark">
            <BsFillGrid3X3GapFill className={cx("icon")} /> Trademark
          </Link>
        </li>
        <li className={cx("sidebar-list-item")}>
          <Link to="/Admin/User">
            <BsPeopleFill className={cx("icon")} /> Customers
          </Link>
        </li>

        <li className={cx("sidebar-list-item")}>
          <Link to="/Admin/TrendingItem">
            <BsListCheck className={cx("icon")} /> Trending Item
          </Link>
        </li>
        <li className={cx("sidebar-list-item")}>
          <Link to="/Admin/Oder">
            <BsMenuButtonWideFill className={cx("icon")} /> Oder
          </Link>
        </li>
        <li className={cx("sidebar-list-item")}>
          <Link to="/Admin/SettingPage">
            <BsFillGearFill className={cx("icon")} /> Setting
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
