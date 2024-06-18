import React, { useEffect, useState, useRef } from "react";

function QrCode({ TransactionCode, amount, DataOut }) {
  const intervalRef = useRef(null);
  const [myBank, setMyBank] = useState({
    BANK_ID: "MB",
    ACCOUNT_NO: "241020024689",
    ACCOUNT_NAME: "NGUYEN DUC HIEP",
  });

  useEffect(() => {
    async function check() {
      try {
        const response = await fetch(
          "https://script.google.com/macros/s/AKfycbxeWDGA0pi5TaQXDBDwdHZ5WXxhOoyIU8MW94gj25omT42NR9e-J1x3SZZQzdQPBiDExw/exec"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data.data[data.data.length - 1]);
        const lastPaid = data.data[data.data.length - 1];

        if (
          lastPaid &&
          "Mô tả" in lastPaid &&
          lastPaid["Mô tả"] === TransactionCode
        ) {
          clearInterval(intervalRef.current);
          DataOut(true);
          
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    intervalRef.current = setInterval(() => {
      check();
    }, 1000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [TransactionCode, DataOut]);

  return (
   <div style={{ maxwidth: "100%", fontsize: "26px" ,  zIndex: "100", position: "fixed", top: "10%", left:" 1%" ,right: "1%", bottom:"1%" ,backgroundColor:"#333",textAlign:"center"}} classname="container">
      <div >
        {" "}
        <img
          style={{maxwidth: "400px"}} src={`https://img.vietqr.io/image/${myBank.BANK_ID}-${myBank.ACCOUNT_NO}-qr_only.png?amount=${amount}&addInfo=${TransactionCode}&accountName=${myBank.ACCOUNT_NAME}`}
          alt=""
        />
      </div>
      <div style={{backgroundColor:"#333",color:"#fff"}} >
        <h4>Ngân Hàng :{myBank.BANK_ID} </h4>
        <h4>Số Tài Khoản :{myBank.ACCOUNT_NO} </h4>
        <h4>Họ Tên Chủ Tài Khoản :{myBank.ACCOUNT_NAME} </h4>
        <h4>Số Tiền :{amount} </h4>
        <h4>Nội Dung Truyển Tiền :{TransactionCode} </h4>
      </div>
    </div>
  );
}

export default QrCode;
