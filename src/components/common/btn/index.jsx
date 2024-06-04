import classNames from "classnames/bind"
import style from './style.model.scss'

const cx = classNames.bind(style)

function Btn( {text,type}) {
    
   

  return <button className={cx("shadow_btn",type)}>{text}</button>;
}

export default Btn;
