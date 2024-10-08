import React from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Payment = () => {

    const navigate = useNavigate();

    const data = {
        name: "Vikas",
        amount: 1,
        number: "9999999999",
        MUID: "MUID" + Date.now(),
        transactionId: "T" + Date.now(),
    };

    const handlePayment = async (e) => {
        e.preventDefault();

        let res = await axios.post("http://localhost:8081/api/order", { ...data })
            .then((res) => {
                window.location.href = res.data.url
                if (res.data && res.data.data.instrumentResponse.redirectInfo.url) {
                    window.location.href =
                        res.data.data.instrumentResponse.redirectInfo.url;
                }
            })

        console.log(res)
            .catch((error) => {
                console.error(error);
            });
    };
    return (
        <div className='pt-5'>
            <div className="pt-5">

                <div className="container my-5 border p-4">
                    <h4 className=''>Brogan Boots</h4>
                    <div className="row">

                        <div className="col-md-6">
                            <form action="">
                                <div className="py-2">
                                    <label htmlFor="">Contact</label>
                                    <input type="email" class="form-control" id="" placeholder="Enter email or mobile number" />
                                </div>
                                <div className='py-2'>
                                    <input type='checkbox' />
                                    <label htmlFor=""> Email me with news</label>
                                </div>
                                <h4>Delivery</h4>
                                <div className="py-2">

                                    <input class="form-control" list="datalistOptions" id="exampleDataList" placeholder=" search country" />
                                    <datalist id="datalistOptions">
                                        <option value="India" />
                                        <option value="New York" />
                                        <option value="Seattle" />
                                        <option value="Los Angeles" />
                                        <option value="Chicago" />
                                    </datalist>
                                </div>
                                <div className="row py-2">
                                    <div className="col-6">

                                        <input type="text" class="form-control" id="" placeholder="First Name" />
                                    </div>
                                    <div className="col-6">

                                        <input type="text" class="form-control" id="" placeholder="Last name" />
                                    </div>
                                </div>
                                <div className="py-2">

                                    <input type="text" class="form-control" id="" placeholder="Addresss" />
                                </div>
                                <div className="py-2">

                                    <input type="text" class="form-control" id="" placeholder="Apartment suite etc." />
                                </div>
                                <div className="row py-2">
                                    <div className="col-4"> <input type="text" class="form-control" id="" placeholder="city" /></div>
                                    <div className="col-4"><input class="form-control" list="data" id="exampleDataList" placeholder="state" />
                                        <datalist id="data">
                                            <option value="mp" />
                                            <option value="cg" />
                                            <option value="mumbai" />
                                            <option value="Ap" />
                                            <option value="Gujrat" />
                                        </datalist></div>
                                    <div className="col-4"> <input type="text" class="form-control" id="" placeholder="Pincode" /></div>
                                </div>
                                <div className="py-2">

                                    <input type="text" class="form-control" id="" placeholder="Phone" />
                                </div>
                                <div className='py-2'>
                                    <input type='checkbox' />
                                    <label htmlFor=""> save this information for next time</label>
                                </div>
                                <div className='py-2'>
                                    <input type='checkbox' />
                                    <label htmlFor=""> Text me with news annd offers</label>
                                </div>
                                <div className='py-2'>
                                    <label htmlFor="">Shippping Method</label>
                                    <input type="" class="form-control" id="" placeholder="Enter Your shipping addres" />
                                </div>
                                <h5>Payment</h5>
                                <div className='py-2'>
                                    <div >All transaction are safe and secure</div>
                                    {/* <input type="radio" id="html" name="fav_language" value="HTML" />
                                    <label htmlFor="html">HTML</label> */}


                                    <input type="radio" value={true} name='invoice_customer' checked={true} />
                                    <label htmlFor="as">Cah Free</label>
                                    <br />
                                    <input type="radio" id="cod" name="fav_language" value="CSS" />
                                    <label htmlFor="cod">Cash on delivery</label><br />

                                </div>
                                <h5>Billing Address</h5>
                                <div className='py-2'>
                                    <input type="radio" value="" name='invoice_customer' id='add' />
                                    <label htmlFor="add">Same as shipping address</label>
                                    <br />
                                    <input type="radio" id="add2" name="fav_language" value="CSS" />
                                    <label htmlFor="add2">Use defferent billing address</label><br />

                                </div>

                            </form>
                        </div>

                        <div className="col-md-6 dflex">
                            <div className="m-2">
                                <img
                                    className="img-fluid cart-img"
                                    src=""
                                    alt=""
                                />
                            </div>
                            <div className="">
                                <div className="d-flex justify-content-between">
                                    <div>name</div>
                                </div>
                                <div className="text-secondary">size : </div>
                                <div className="text-secondary">
                                    category :
                                </div>
                            </div>

                            <form action="" onSubmit={handlePayment}>
                            <div className="d-flex gap-4 py-2">
                                <input type="text" class="form-control" id="" placeholder="discount code or gift card" />
                                <button className='btn bg-color btn-primary'>Apply</button>
                            </div>
                            <div className="d-flex justify-content-between py-2">
                                <span>SUbtotal</span>
                                <span>10090</span>
                            </div>
                            <div className="d-flex justify-content-between py-2">
                                <span>Shipping</span>
                                <span>Enter shipping eddress</span>
                            </div>
                            <div className="d-flex justify-content-between py-2 fw-bold">
                                <span >Total</span>
                                <span>34673</span>
                            </div>
                            <div className="text-secondary my-2">incluiding in 24 rs taxes</div>
                            <button className='btn bg-color btn-primary w-100'>PAY NOW</button>
                            </form>
                           
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default Payment