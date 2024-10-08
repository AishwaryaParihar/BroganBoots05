const FRONTEND_URL = process.env.FRONTEND_URL

const paymentStatus = async (req, res) => {
  let salt_key = process.env.SALT_KEY;
  const merchantTransactionId = req.query.id;
  const merchantId = process.env.MERCHANT_ID;

  const keyIndex = 1;
  const string = `/pg/v1/status/${merchantId}/${merchantTransactionId}` + salt_key;
  const sha256 = crypto.createHash("sha256").update(string).digest("hex");
  const checksum = sha256 + "###" + keyIndex;

  const options = {
    method: "GET",
    url: `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchantId}/${merchantTransactionId}`,
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      "X-VERIFY": checksum,
      "X-MERCHANT-ID": `${merchantId}`,
    },
  };

  // CHECK PAYMENT TATUS
  axios
    .request(options)
    .then(async (response) => {
      if (response.data.success === true) {
        const url = `${FRONTEND_URL}/success`;
        return res.redirect(url);
      } else {
        const url = `${FRONTEND_URL}/failure`;
        return res.redirect(url);
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = paymentStatus