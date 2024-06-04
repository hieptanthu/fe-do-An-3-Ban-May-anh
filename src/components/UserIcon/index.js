
import React from 'react';
import { useRecoilValue } from 'recoil';
import { accState } from '../../constant/recoil';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const UserIcon = () => {
    const acc = useRecoilValue(accState);
    console.log(acc)
    return (
        <>
            {/* Bạn có thể sử dụng `acc` để hiển thị biểu tượng người dùng hoặc thông tin khác */}
            <div>
                {/* Ví dụ, hiển thị tên người dùng */}
                {acc ?
                    <div><FontAwesomeIcon icon={faUser} />{acc.firstName + " " + acc.lastName}</div>

                    : <Link to="/Cart" >
                        <FontAwesomeIcon icon={faUser} />
                        Đăng nhâp
                    </Link>}
            </div>
        </>
    );
}

export default UserIcon;