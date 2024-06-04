import './style.module.scss';
import TrademarkApi from '../../../api/TrademarkApi';
import { useEffect, useState } from 'react';
import Loading from '../../../components/common/Loading';
import { Link } from 'react-router-dom';
function Banner() {

    const [Trademarks, setTrademarks] = useState([]);



    useEffect(() => {

        const getDataApi = async () => {
            const data = await TrademarkApi.get()
            if (data.success) {

                setTrademarks(data.dataOut)

            }


        }


        getDataApi();

    }, [])

    return (
        <section className="small-banner section">
            <div className="container-fluid">
                {Trademarks.length == 0 ? <Loading /> : (
                     <div className="row">
                     {Trademarks.map(item => (
                         <div key={item._id} className="col-lg-2 col-md-6 col-12">
                             <div className="single-banner">
                                 <img src={item.Img || "https://via.placeholder.com/600x370"} alt="#" />
                                 <div className="content">
                                     <h3 title={item.Title}>{item.Name}</h3>
                                     <Link  to={"products/"}  state={{ TrademarkId:  item._id}}>See Now</Link>
                                 </div>
                             </div>
                         </div>
                     ))}
                 </div>)}

            </div>
        </section>
    );
}

export default Banner;
