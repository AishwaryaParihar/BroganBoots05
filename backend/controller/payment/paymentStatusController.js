const axios = require("axios");

const paymentStatusController = async (req, res) => {
  try {
    // Get the transaction ID from the query parameters or request body
    const { id: transactionId } = req.query; // Assuming the transaction ID comes from query string

    // Log for debugging
    console.log("Payment status callback received for transaction ID:", transactionId);

    // Validate the transaction ID
    if (!transactionId) {
      return res.status(400).json({
        message: "Invalid transaction ID",
        success: false,
      });
    }

    // Here you can update your database to reflect the payment status
    // Assuming you have a payment model or service to handle database operations
    // Example: await PaymentService.updatePaymentStatus(transactionId, paymentStatus);

    // You can also verify the payment status by making a request to the PhonePe API
    // to confirm the transaction outcome, if needed. Example:

    // const phonePeResponse = await axios.get(`PhonePe Verification API Endpoint`, {
    //   params: { transactionId }
    // });

    // Handle your logic for successful or failed payment
    // phonePeResponse.data.status will give you success/failure status from PhonePe

    return res.status(200).json({
      message: "Payment status received and processed successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error in processing payment status:", error.message);
    return res.status(500).json({
      message: "Failed to process payment status",
      success: false,
    });
  }
};

module.exports = paymentStatusController;

