const axios = require("axios");
const FRONTEND_URL = process.env.FRONTEND_URL
require("dotenv").config();
const crypto = require("crypto");

const phonePePayment = async (req, res) => {
  try {
    const merchant_id = "BROGANBOOTSUAT";
    const salt_key = "94f2c0cf-c52f-4c7a-ab6b-24414c8ff7d3";

    const merchantTransactionId = req.body.transactionId;
    // const data = {
    //   merchantId: merchant_id,
    //   merchantTransactionId: merchantTransactionId,
    //   merchantUserId: req.body.MUID,
    //   name: req.body.name,
    //   amount: req.body.amount * 100,
    //   redirectUrl: `http://localhost:8081/api/status/?id=${merchantTransactionId}`,
    //   redirectMode: "POST",
    //   mobileNumber: req.body.number,
    //   paymentInstrument: {
    //     type: "PAY_PAGE",
    //   },
    // };

    const data = {
      merchantId: merchant_id,
      merchantTransactionId: merchantTransactionId,
      merchantUserId: req.body.MUID,
      amount: req.body.amount * 100,
      name: "anuj",
      redirectUrl: `${FRONTEND_URL}/api/status/?id=${merchantTransactionId}`,
      redirectMode: "POST",
      callbackUrl: "https://webhook.site/callback-url",
      mobileNumber: "9999999999",
      paymentInstrument: {
        type: "PAY_PAGE", 
      },
    };

    console.log(data);

    const payload = JSON.stringify(data);
    const payloadMain = btoa(payload);
    const keyIndex = 1;
    const string = payloadMain + "/pg/v1/pay" + salt_key;
    const sha256 = crypto.createHash("sha256").update(string).digest("hex");
    const checksum = sha256 + "###" + keyIndex;
    const prod_URL =
      "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";

    const options = {
      method: "POST",
      url: prod_URL,
      headers: {
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
      },
      data: {
        request: payloadMain,
      },
    };

    try {
      const response = await axios.request(options);
      // console.log(response.data.data)
      console.log(response.data.data.instrumentResponse.redirectInfo);
      return res.json(response.data.data.instrumentResponse.redirectInfo);
    } catch (error) {
      // console.log(error);
      return res.status(500).json({
        message: error.message,
        success: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

module.exports = phonePePayment;
