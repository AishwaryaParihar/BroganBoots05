const axios = require("axios");
const crypto = require("crypto");
const transactiondetails = require("../../models/transactionModel");
require("dotenv").config();

const phonePePayment = async (req, res) => {
    try {
        const { transactionId, MUID, amount, name, email, address, city, state, pinCode, paymentMethod, transaction_id, paymentId, number, items } = req.body;

        // Ensure all required fields are provided
        if (!transaction_id ) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }

        const merchant_id = process.env.MERCHANT_ID;
        const salt_key = process.env.SALT_KEY;
        const frontendUrl = process.env.FRONTEND_URL;

        const data = {
            merchantId: merchant_id,
            merchantTransactionId: transactionId,
            merchantUserId: MUID,
            amount: amount * 100, // Amount in paise
            name: name,
            redirectUrl: `${frontendUrl}/api/status/?id=${transaction_id}`,
            redirectMode: "POST",
            callbackUrl: "https://webhook.site/callback-url", // Change as needed
            mobileNumber: number,
            paymentInstrument: {
                type: "PAY_PAGE",
            },
        };

        const payload = JSON.stringify(data);
        const payloadMain = Buffer.from(payload).toString("base64");
        const keyIndex = 1;
        const string = payloadMain + "/pg/v1/pay" + salt_key;
        const sha256 = crypto.createHash("sha256").update(string).digest("hex");
        const checksum = sha256 + "###" + keyIndex;

        const prod_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";

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

        const response = await axios.request(options);
        const redirectInfo = response.data.data.instrumentResponse.redirectInfo;

        // Save transaction data to MongoDB
        const transactionData = {
            fullName: name,
            phoneNumber: number,
            email: email,
            address: address,
            city: city,
            state: state,
            pinCode: pinCode,
            paymentMethod: paymentMethod,
            amount: amount,
            items: items,
            MUID: MUID,
            transactionId: transactionId,
            transaction_id: transaction_id, // Ensure this is included
            created_at: new Date(),
            merchant_id: merchant_id,
            payment_id: paymentId // If this is needed
        };
console.log("abccccccc",transactionData)
        const newTransaction = new transactiondetails(transactionData);
        await newTransaction.save();

        return res.json(redirectInfo); // Send the redirect URL to the frontend
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: error.message,
            success: false,
        });
    }
};

module.exports = phonePePayment;
