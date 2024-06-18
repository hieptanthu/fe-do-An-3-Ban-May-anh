import React, { useEffect, useState } from 'react'
import classNames from "classnames/bind";
import styles from "./style.model.scss";
import trendingItemApi from '../../../api/trendingItemApi';
import ModalCreateUpdate from './ModalCreateUpdate'
import { toast, Bounce } from "react-toastify";
const cx = classNames.bind(styles);

function TrendingItem() {
  const [listTrendingItems,setListTrendingItems] = useState([])
  const [show,setShow] = useState(false)
  const [data,setData] = useState([])

  useEffect(()=>{

    const callApiTrendingItems= async()=>{
       const dataOutApi = await trendingItemApi.get()
       if(dataOutApi.success)
        {

          setListTrendingItems(dataOutApi.dataOut)

        }
    }

    callApiTrendingItems()

  },[listTrendingItems])



  function CallCreateUpdate(datain){
    setData(datain)
    setShow(!show)
  }


 async function Delete(_id) {

  const answer = window.confirm("Do you want delete?");
    if (answer) {
      const dataOutApi= await trendingItemApi.delete(_id)
      if (dataOutApi.success) {
        toast.success("delete success", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });

        
      } else {
        toast.error("not delete", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    } else {
      console.log("User clicked no", _id);
    }

 }


  function UpdateCreateUpdate(data){
    
    const index = listTrendingItems.findIndex(item => item._id === data._id)
    if(index !== -1){

      setListTrendingItems(prevList => {
        return prevList.map(item => {
          if (item._id === data._id) {
            return data;
          } else {
            return item;
          }
        });
      });
    }else{
      setListTrendingItems([...listTrendingItems,data])
    }
  }

  

  return (

    <>
  {show && <ModalCreateUpdate show={show} handleClose={()=>{setShow(!show)}} data={data} dataOut={(datain)=>UpdateCreateUpdate(datain)} ></ModalCreateUpdate>}
   
      <main className={cx("main-container")}>
        <div className={cx("main-title")}>
          <h3>TrendingItem</h3>
          <button
            onClick={() => CallCreateUpdate(null)}
            type="button"
            className="btn btn-danger"
            style={{ marginLeft: "10px" }}
          >
            Add
          </button>
        </div>

        <div>
          {listTrendingItems.length === 0 ? (
            <h3 style={{ color: "#333", textAlign: "center" }}>
              Chưa có TrendingItem
            </h3>
          ) : (
            <>
              <table className="table">
                <thead>
                  <tr>
                    <th className='text-center' scope="col">Name</th>
                    <th className='text-center' scope="col">Quantity items</th>
                    <th className='text-center' scope="col">action</th>
                  </tr>
                </thead>
                <tbody>
                  {listTrendingItems.map((item) => (
                    <tr key={item._id}>
                      <td className='text-center' >{item.Name}</td>

                      <td className='text-center'>{item.ListProduct.length}</td>
                     
                      <td className='text-center'>
                        <button
                          onClick={() => CallCreateUpdate(item)}
                          type="button" className="btn btn-warning">

                          Update
                        </button>
                        <button
                          onClick={() => Delete(item._id)}
                          type="button"
                          className="btn btn-danger"
                          style={{ marginLeft: "10px" }}
                        >
                          delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

            </>
          )}
        </div>
      </main>
    </>
  )
}

export default TrendingItem