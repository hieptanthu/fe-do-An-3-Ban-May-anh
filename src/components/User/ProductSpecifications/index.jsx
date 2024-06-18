import ProductSpecificationsApi from "../../../api/ProductSpecificationsApi";
import Loading from "../../../components/common/Loading";
import React, { useEffect, useState } from 'react';

function ProductSpecifications({ ProductId }) {

    const [specifications, setSpecifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await ProductSpecificationsApi.get(ProductId);
                if (data.success) {
                    setSpecifications(data.dataOut);
                    setLoading(false);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, [ProductId]);

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <>
                    {specifications.length === 0 ? (
                        <h3 className="text-center" >Thông tin đang đợi cập nhập</h3>
                    ) : (
                        <div className="row">
                            {specifications.map((item) => (
                                <div key={item._id} className="col-xl-6 col-12">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th className="text-center" colSpan="2">{item.Name}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {item.ListDetail && item.ListDetail.length ? (
                                                item.ListDetail.map((Item2, index) => (
                                                    <tr   key={index}>
                                                        <td className="text-center" >{Item2.Name}</td>
                                                        <td className="text-center">{Item2.Detail}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="2" className="text-center">Chưa có thông tin</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
        </>
    );
}

export default ProductSpecifications;
