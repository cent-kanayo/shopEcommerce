import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { placeOrder } from "../features/orderSlice";
import { store } from "../store";

import Header from "./../components/Header";
import Message from "./../components/LoadingError/Error";

const PlaceOrderScreen = () => {
  window.scrollTo(0, 0);
  const navigate = useNavigate();

  const {
    cart,
    shippingAddress,
    success,
    error,
    errorMsg,
    totalPrice,
    paymentMethod,
  } = useSelector((state) => state.orders);
  const userLogin = useSelector((state) => state.user);
  const { user: userInfo } = userLogin;

  //Calculate all the price here and return

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  // cart.itemsPrice = addDecimals(
  //   cart.cartItems.reduce((acc, item) => (acc += item.price * item.qty), 0)
  // );

  const shippingPrice = addDecimals(totalPrice > 100 ? 0 : 100);
  const taxPrice = addDecimals(Number((0.15 * totalPrice).toFixed(2)));
  const totalItemPrice = (
    Number(totalPrice) +
    Number(shippingPrice) +
    Number(taxPrice)
  ).toFixed(2);

  // const orderCreate = useSelector((state) => state.orderCreate);
  // const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      navigate(`/order`);
    }
  }, [success]);

  const placeOrderHandler = (e) => {
    store.dispatch(
      placeOrder({
        orderItems: cart,
        shippingAddress: shippingAddress,
        paymentMethod: paymentMethod,
        itemsPrice: totalPrice,
        shippingPrice: shippingPrice,
        taxPrice: taxPrice,
        totalPrice: totalItemPrice,
      })
    );
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="row  order-detail">
          <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
            <div className="row ">
              <div className="col-md-4 center">
                <div className="alert-success order-box">
                  <i class="fas fa-user"></i>
                </div>
              </div>
              <div className="col-md-8 center">
                <h5>
                  <strong>Customer</strong>
                </h5>
                <p>{userInfo.name}</p>
                <p>{userInfo.email}</p>
              </div>
            </div>
          </div>
          {/* 2 */}
          <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
            <div className="row">
              <div className="col-md-4 center">
                <div className="alert-success order-box">
                  <i className="fas fa-truck-moving"></i>
                </div>
              </div>
              <div className="col-md-8 center">
                <h5>
                  <strong>Order info</strong>
                </h5>
                <p>Shipping: {shippingAddress.country}</p>
                <p>Pay method: </p>
              </div>
            </div>
          </div>
          {/* 3 */}
          <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
            <div className="row">
              <div className="col-md-4 center">
                <div className="alert-success order-box">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
              </div>
              <div className="col-md-8 center">
                <h5>
                  <strong>Deliver to</strong>
                </h5>
                <p>
                  Address: {shippingAddress.city}, {shippingAddress.address},{" "}
                  {shippingAddress.postalCode}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row order-products justify-content-between">
          <div className="col-lg-8">
            {cart.length === 0 ? (
              <Message variant="alert-info mt-5">Your cart is empty</Message>
            ) : (
              <>
                {cart.map((item, index) => (
                  <div className="order-product row" key={index}>
                    <div className="col-md-3 col-6">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="col-md-5 col-6 d-flex align-items-center">
                      <Link to={`/products/${item.product}`}>
                        <h6>{item.name}</h6>
                      </Link>
                    </div>
                    <div className="mt-3 mt-md-0 col-md-2 col-6  d-flex align-items-center flex-column justify-content-center ">
                      <h4>QUANTITY</h4>
                      <h6>{item.qty}</h6>
                    </div>
                    <div className="mt-3 mt-md-0 col-md-2 col-6 align-items-end  d-flex flex-column justify-content-center ">
                      <h4>SUBTOTAL</h4>
                      <h6>${item.qty * item.price}</h6>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
          {/* total */}
          <div className="col-lg-3 d-flex align-items-end flex-column mt-5 subtotal-order">
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <td>
                    <strong>Products</strong>
                  </td>
                  <td>${totalPrice}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Shipping</strong>
                  </td>
                  <td>${shippingPrice}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Tax</strong>
                  </td>
                  <td>${taxPrice}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Total</strong>
                  </td>
                  <td>${totalItemPrice}</td>
                </tr>
              </tbody>
            </table>

            {cart.length === 0 ? null : (
              <button type="submit" onClick={placeOrderHandler}>
                PLACE ORDER
              </button>
            )}

            {/* {error && (
              <div className="my-3 col-12">
                <Message variant="alert-danger">{error}</Message>
              </div>
            )} */}

            {/* <div className="my-3 col-12">
                <Message variant="alert-danger">{error}</Message>
              </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceOrderScreen;
