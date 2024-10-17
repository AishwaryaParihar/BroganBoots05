import React, { useContext, useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import Context from '../../context';
import SummaryApi from '../../common/Index';
import displayINRCurrency from '../../helper/displayCurrency';
import { incremented, decremented } from '../../store/CounterSlice';

const Payment = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const context2 = useContext(Context);
    const dispatch = useDispatch();
    const countProduct = useSelector((state) => state.counter.value);
  
    // Fetch cart data from the API
    const fetchData = async () => {
        const response = await fetch(SummaryApi.addToCartProductView.url, {
            method: SummaryApi.addToCartProductView.method,
            credentials: "include",
            headers: {
                "content-type": "application/json",
            },
        });

        const responseData = await response.json();

        if (responseData.success) {
            setData(responseData.data);
        }
    };
  
    // Handle loading state
    const handleLoading = async () => {
        setLoading(true);
        await fetchData();
        setLoading(false);
    };
  
    useEffect(() => {
        handleLoading();
    }, []);
  
    // Increase product quantity
    const increaseQty = async (id) => {
        dispatch(incremented(id));
        const response = await fetch(SummaryApi.updateCartProduct.url, {
            method: SummaryApi.updateCartProduct.method,
            credentials: "include",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ _id: id, quantity: countProduct + 1 }),
        });
        const responseData = await response.json();
        if (responseData.success) {
            fetchData();
        }
    };
  
    // Decrease product quantity
    const decreaseQty = async (id, currentQty) => {
        if (currentQty > 1) {
            dispatch(decremented(id));
            const response = await fetch(SummaryApi.updateCartProduct.url, {
                method: SummaryApi.updateCartProduct.method,
                credentials: "include",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ _id: id, quantity: currentQty - 1 }),
            });
            const responseData = await response.json();
            if (responseData.success) {
                fetchData();
            }
        }
    };
  
    // Delete product from cart
    const deleteCartProduct = async (id) => {
        const response = await fetch(SummaryApi.deleteCartProduct.url, {
            method: SummaryApi.deleteCartProduct.method,
            credentials: "include",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({ _id: id }),
        });

        const responseData = await response.json();

        if (responseData.success) {
            fetchData();
            context2.fetchUserAddToCart();
        }
    };
  
    // Calculate total quantity and price
    const totalQty = data.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0);
    const totalPrice = data.reduce((preve, curr) => preve + curr.quantity * curr?.productId?.sellingPrice, 0);
  
    const navigate = useNavigate();

    // State for form fields
    const [formData, setFormData] = useState({
        fullName: "",
        phoneNumber: "",
        email: "",
        address: "",
        city: "",
        state: "",
        pinCode: "",
        paymentMethod: "online",  // default as online or cod
    });

    // Handle input change and set to state
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle payment submission
    const handlePayment = async (e) => {
        e.preventDefault();
    
<<<<<<< HEAD
        // Generate a unique transaction ID
        const transaction_id = `T${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    
        const paymentData = {
=======
        const paymentData = {  // Renamed from data to paymentData
>>>>>>> ebbef1848e7e985b990a5a3f65ee42e73d455b47
            ...formData,
            amount: totalPrice,
            items: data.map(product => ({
                productName: product.productId.productName,
                qty: product.quantity,
                price: product.productId.sellingPrice
            })),
            MUID: "MUID" + Date.now(),
            transactionId: transaction_id, // Use the generated transaction ID here
        };
    
        try {
<<<<<<< HEAD
            let res = await axios.post("http://localhost:8087/api/order", { ...paymentData });
=======
            let res = await axios.post("https://broganboots02.onrender.com/api/order", { ...paymentData });
>>>>>>> ebbef1848e7e985b990a5a3f65ee42e73d455b47
            console.log(res.data);
    
            // If COD, just confirm the order
            if (formData.paymentMethod === "cod") {
                alert("Order placed successfully!");
                return;
            }
    
            // If online payment, redirect to the payment URL
            if (res.data.url) {
                window.location.href = res.data.url;  // Redirect to payment gateway
            }
        } catch (error) {
            console.error("Error during payment:", error);
        }
    };
    
<<<<<<< HEAD
    
=======

    

>>>>>>> ebbef1848e7e985b990a5a3f65ee42e73d455b47
    return (
        <div className='pt-5'>
            <div className="pt-5">
                <div className="container my-5 border p-4">
                    <h4>Brogan Boots</h4>
                    <div className="row">
                        <div className="col-md-6">
<<<<<<< HEAD
                            <div>
                                {loading
                                    ? <div>Loading...</div>
                                    : data.map((product) => {
                                        return (
                                            <div className="d-flex" key={product?._id}>
                                                <div className="m-2">
                                                    <img
                                                        className="img-fluid cart-img"
                                                        src={product?.productId?.productImage[0]}
                                                        alt={product?.productId?.productName}
                                                    />
                                                </div>
                                                <div className="m-2">
                                                    <h5>{product?.productId?.productName}</h5>
                                                    <p>Price: {displayINRCurrency(product?.productId?.sellingPrice)}</p>
                                                    <div className="d-flex align-items-center">
                                                        <button
                                                            className="btn minus border-0"
                                                            onClick={() => decreaseQty(product?._id, product.quantity)}
                                                        >
                                                            <span className="minus-circle">
                                                                <span className="minus-sign">-</span>
                                                            </span>
                                                        </button>
                                                        <span>{product?.quantity}</span>
                                                        <button
                                                            className="btn plus border-0"
                                                            onClick={() => increaseQty(product?._id)}
                                                        >
                                                            <span className="plus-circle">
                                                                <span className="plus-sign">+</span>
                                                            </span>
                                                        </button>
                                                        <button
                                                            className="btn btn-danger ms-2"
                                                            onClick={() => deleteCartProduct(product?._id)}
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
=======
                            
                            <div className="">
                                {loading
                                  ? <div>Loading...</div>
                                  : data.map((product) => {
                                      return (
                                        <div
                                          className="d-flex"
                                          key={product?._id}
                                        >
                                          <div className="m-2">
                                            <img
                                              className="img-fluid cart-img"
                                              src={product?.productId?.productImage[0]}
                                              alt={product?.productId?.productName}
                                            />
                                          </div>
                                          <div className="m-2">
                                            <h5>{product?.productId?.productName}</h5>
                                            <p>Price: {displayINRCurrency(product?.productId?.sellingPrice)}</p>
                                            <div className="text-secondary">size : {product?.productId?.size}</div>
                                            <div className="d-flex align-items-center">
                                              <button
                                                  className="btn minus border-0"
                                                  onClick={() => decreaseQty(product?._id, product.quantity)}
                                              >
                                                  <span className="minus-circle">
                                                      <span className="minus-sign">-</span>
                                                  </span>
                                              </button>
                                              <span>{product?.quantity}</span>
                                              <button
                                                  className="btn plus border-0"
                                                  onClick={() => increaseQty(product?._id)}
                                              >
                                                  <span className="plus-circle">
                                                      <span className="plus-sign">+</span>
                                                  </span>
                                              </button>
                                              <button
                                                  className="btn btn-danger ms-2"
                                                  onClick={() => deleteCartProduct(product?._id)}
                                              >
                                                  Remove
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      );
                                  })}
>>>>>>> ebbef1848e7e985b990a5a3f65ee42e73d455b47
                            </div>
                        </div>
                        <div className="col-md-6">
                            {/* Product Details */}
                            <form onSubmit={handlePayment}>
                                <div className="py-2">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter email"
                                        required
                                    />
                                </div>
                                <div className="py-2">
                                    <label htmlFor="phoneNumber">Mobile Number</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        placeholder="Enter mobile number"
                                        required
                                    />
                                </div>
                                <h4>Delivery</h4>
                                <div className="row py-2">
                                    <div className="col-12">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            placeholder="Full Name"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="py-2">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        placeholder="Address"
                                        required
                                    />
                                </div>
                                <div className="row py-2">
                                    <div className="col-4">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            placeholder="City"
                                            required
                                        />
                                    </div>
                                    <div className="col-4">
                                        <input
                                            className="form-control"
                                            list="data"
                                            name="state"
                                            value={formData.state}
                                            onChange={handleChange}
                                            placeholder="State"
                                            required
                                        />
                                        <datalist id="data">
                                            <option value="mp" />
                                            <option value="cg" />
                                            <option value="mumbai" />
                                            <option value="Ap" />
                                            <option value="Gujarat" />
                                        </datalist>
                                    </div>
                                    <div className="col-4">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="pinCode"
                                            value={formData.pinCode}
                                            onChange={handleChange}
                                            placeholder="Pin Code"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="py-2">
                                    <label htmlFor="paymentMethod">Payment Method</label>
                                    <select
                                        className="form-select"
                                        name="paymentMethod"
                                        value={formData.paymentMethod}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="online">Online</option>
                                        <option value="cod">Cash on Delivery</option>
                                    </select>
                                </div>
                                <h4 className="my-3">Total Amount: {displayINRCurrency(totalPrice)}</h4>
                                <button className="btn btn-primary" type="submit">Confirm Payment</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
