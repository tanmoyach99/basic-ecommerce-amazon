import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { addToCart, removeFromCart } from "../../actions/cartAction";

const Cart = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const productId = id;
  const location = useLocation();
  const history = useHistory();
  const cart = useSelector((state) => state.cart);

  const { cartItems } = cart;
  console.log(cartItems);

  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (Id) => {
    dispatch(removeFromCart(Id));
  };

  const checkoutHandler = () => {
    history.push("/signIn?redirect=shipping");
  };
  return (
    <div className="row">
      <div className="col-md-9">
        <h4 className="text-left">Shopping cart</h4>
        {cartItems.map((pd) => (
          <div className="row mt-4">
            <div className="col-md-2">
              <img src={pd.image} alt="" style={{ height: "60px" }} />
            </div>
            <div className="col-md-4">
              {" "}
              <Link to={`/product/${pd.product}`}>{pd.name} </Link>{" "}
            </div>
            <div className="col-md-2">
              <select
                value={pd.qty}
                onChange={(e) =>
                  dispatch(addToCart(pd.product, Number(e.target.value)))
                }
              >
                {[...Array(pd.countInStock).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>
                    {x + 1}{" "}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-2">{pd.price}</div>
            <div className="col-md-2">
              <button
                onClick={() => removeFromCartHandler(pd.product)}
                className="btn-warning"
              >
                delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="col-md-3 row">
        <h4 className="p-2 mt-5">
          {" "}
          Subtotal({cartItems.reduce((a, c) => a + c.qty, 0)} items):
          <span className="p-2">
            $ ({cartItems.reduce((a, c) => a + c.price * c.qty, 0)}){" "}
          </span>
        </h4>

        <div>
          <button onClick={checkoutHandler} className="btn btn-warning">
            {" "}
            Proceed To checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
