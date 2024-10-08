const mongoose = require("mongoose");

const transactionModel = new mongoose.Schema(
    {
    transaction_id : {
        type:String,
        uniqui: true,
    },
    user_id:String,
    murchant_id : String,
    amount : Number,
    created_at : String,
    product_id:String,
    payment_id : String,
},{
    timestamps:true
}
)
const transactiondetails=mongoose.model("transaction", transactionModel)
module.exports = transactiondetails