import classNames from "classnames/bind"
import style from './style.module.scss'
import { BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify } from 'react-icons/bs'
const cx = classNames.bind(style)


function Header({ OpenSidebar }) {
    return <> <header className={cx('header')}>
        <div className={cx('menu-icon')}>
            <BsJustify className={cx('icon')} onClick={OpenSidebar} />
        </div>
        <div className={cx('header-left')}>
            <BsSearch className={cx('icon')} />
        </div>
        <div className={cx('header-right')}>
            <BsFillBellFill className={cx('icon')} />
            <BsFillEnvelopeFill className={cx('icon')} />
            <BsPersonCircle className={cx('icon')} />
        </div>
    </header></>
}

export default Header