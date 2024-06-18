import React from 'react'
import classNames from "classnames/bind";
import styles from "./style.model.scss";
import Slider from './Slider';


const cx = classNames.bind(styles);
function SettingPage() {
  return (


    <main className={cx("main-container")}>
        <div className={cx("main-title")}>
          <h3>SetupPage</h3>

          
        </div>
        <Slider/>
    </main>
  )
}

export default SettingPage