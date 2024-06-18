import React from "react";
import classNames from "classnames/bind";
import styles from "./style.module.scss";
import { FaCalendarAlt } from "react-icons/fa";
const cx = classNames.bind(styles);

function ItemList({ styles = "", Name, date, Title }) {
  return (
    <div className={ cx("new__List-item",styles)}>
      <div>
        <h4 className={cx("title-h4")}>
          <p title={Name}>{Name}</p>
        </h4>

        <div className={cx("product__title")}>
          <div className={cx("product__title-name")}>
            <p>{Title}</p>
          </div>
        </div>
      </div>

      <div style={{float: "right"}} className={cx("calendar")}>
        <FaCalendarAlt className={cx("date")} />
        {date} 
      </div>
    </div>
  );
}

export default ItemList;
