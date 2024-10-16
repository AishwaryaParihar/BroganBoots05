const axios = require("axios");
const FRONTEND_URL = process.env.FRONTEND_URL;
require("dotenv").config();
const crypto = require("crypto");

const phonePePayment = async (req, res) => {
  try {
    const {
      transactionId,
      MUID,
      amount,
      fullName,
      phoneNumber,
    } = req.body;

    const merchant_id = process.env.MERCHANT_ID;
    const salt_key = process.env.SALT_KEY;

    console.log("data", req.body);
    const data = {
      merchantId: merchant_id,
      merchantTransactionId: transactionId,
      merchantUserId: MUID,
      amount: amount * 100, // Amount in paise
      name: fullName,
      // redirectUrl: `${FRONTEND_URL}`,
      redirectUrl: `${FRONTEND_URL}/api/payment-status/?id=${transactionId}`,
      redirectMode: "POST",
      callbackUrl: "http://localhost:5173/api/payment-status",  // Your production callback URL
      mobileNumber: phoneNumber,
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };

    // Logging for debugging
    console.log(data);

    // Preparing payload
    const payload = JSON.stringify(data);
    const payloadMain = Buffer.from(payload).toString('base64');
    const keyIndex = 1;
    const string = payloadMain + "/pg/v1/pay" + salt_key;
    const sha256 = crypto.createHash("sha256").update(string).digest("hex");
    const checksum = sha256 + "###" + keyIndex;

    // Production URL for PhonePe
    const prod_URL = "https://api.phonepe.com/apis/hermes/pg/v1/pay";

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

    // Make the API call to PhonePe
    const response = await axios.request(options);
    console.log(response.data.data.instrumentResponse.redirectInfo);
    return res.json(response.data.data.instrumentResponse.redirectInfo);
  } catch (error) {
    console.error("Error during payment processing:", error.response ? error.response.data : error.message);
    return res.status(500).json({
      message: "Payment processing failed. Please try again later.",
      success: false,
    });
  }
};

module.exports = phonePePayment;
