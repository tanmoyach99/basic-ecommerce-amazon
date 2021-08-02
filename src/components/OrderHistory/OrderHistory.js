import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { listOrderMine } from "../../actions/orderAction";
import Loader from "../Loader/Loader";

const OrderHistory = () => {
  const history = useHistory();

  const orderMineList = useSelector((state) => state.orderMineList);
  const { orders, loading } = orderMineList;
  console.log(orderMineList);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listOrderMine());
  }, [dispatch]);
  return (
    <div>
      <h1 className="mx-5">Order History</h1>
      <div className="mx-5">
        <div>
          {loading ? (
            <Loader></Loader>
          ) : (
            <table>
              <thead>
                <tr>
                  <th className="p-2">id</th>

                  <th>total</th>
                  <th className="p-2">paid</th>
                  <th className="p-2">delivered</th>
                  <th>actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td className="p-4">{order?._id}</td>
                    {/* <td>{order?.createdAt?.substring(0, 10)}</td> */}
                    <td>{order?.totalPrice}</td>
                    <td className="p-2">
                      {order?.isPaid ? order.paidAt?.substring(0, 10) : "No"}
                    </td>
                    <td className="p-2">
                      {order?.isDelivered
                        ? order.deliveredAt.substring(0, 10)
                        : "No"}
                    </td>
                    <td>
                      <button
                        onClick={() => history.push(`order/${order._id}`)}
                        className="btn btn-warning"
                      >
                        details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
