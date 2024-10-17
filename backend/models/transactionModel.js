const mongoose = require("mongoose");

const transactionModel = new mongoose.Schema(
    {
        fullName: {
            type: String,
            trim: true,
           
        },
        phoneNumber: {
            type: String,
            trim: true,
            minlength: 10,
            maxlength: 15,
           
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
            validate: {
                validator: function (v) {
                    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
                },
                message: (props) => `${props.value} is not a valid email!`
            },
            // Ensure it's required
        },
        address: {
            type: String,
            trim: true,
            // Ensure it's required
        },
        city: {
            type: String,
            trim: true,
            // Ensure it's required
        },
        state: {
            type: String,
            trim: true,
            // Ensure it's required
        },
        pinCode: {
            type: String,
            trim: true,
            minlength: 6,
            maxlength: 7,
           // Ensure it's required
        },
        paymentMethod: {
            type: String,
            enum: ['online', 'cod'],
         default:'online'
        },
        amount: {
            type: Number,
            min: 0,
            // Ensure it's required
        },
        items: [{
            productName: {
                type: String,
                trim: true,
    // Ensure it's required
            },
            qty: {
                type: Number,
                min: 1,
               // Ensure it's required
            },
            price: {
                type: Number,
                min: 0,
               // Ensure it's required
            },
        }],
        MUID: {
            type: String,
            
        },
        transactionId: {
            type: String,
           
        },
        transaction_id: {
            type: String,
            unique: true, // Ensure uniqueness
           
        },
        user_id: String,
        merchant_id: String,
        created_at: {
            type: Date,
            default: Date.now, // Automatically set the creation date
        },
        payment_id: String,
    },
    {
        timestamps: true
    }
);

const transactiondetails = mongoose.model("transaction", transactionModel);
module.exports = transactiondetails;
