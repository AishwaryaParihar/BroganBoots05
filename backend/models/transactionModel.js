const mongoose = require("mongoose");

const transactionModel = new mongoose.Schema(
    {
<<<<<<< HEAD
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
=======

        fullName: {
            type: String,
            required: true,  // Required field
            trim: true,  // Remove extra spaces
        },
        phoneNumber: {
            type: String,
            required: true,  // Required field
            trim: true,  // Remove extra spaces
            minlength: 10,  // Minimum length for phone number
            maxlength: 15,  // Maximum length for phone number
        },
        email: {
            type: String,
            required: true,  // Required field
            trim: true,  // Remove extra spaces
            lowercase: true,  // Store emails in lowercase
            validate: {
                validator: function(v) {
                    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);  // Basic email validation
                },
                message: props => `${props.value} is not a valid email!`
            }
        },
        address: {
            type: String,
            required: true,  // Required field
            trim: true,  // Remove extra spaces
        },
        city: {
            type: String,
            required: true,  // Required field
            trim: true,  // Remove extra spaces
        },
        state: {
            type: String,
            required: true,  // Required field
            trim: true,  // Remove extra spaces
        },
        pinCode: {
            type: String,
            required: true,  // Required field
            trim: true,  // Remove extra spaces
            minlength: 6,  // Minimum length for pin code
            maxlength: 7,  // Maximum length for pin code
        },
        paymentMethod: {
            type: String,
            enum: ['online', 'cod'],  // Enum for payment methods
            default: 'online',  // Default value
        },
        amount: {
            type: Number,
            required: true,  // Required field
            min: 0,  // Amount cannot be negative
>>>>>>> ebbef1848e7e985b990a5a3f65ee42e73d455b47
        },
        items: [{
            productName: {
                type: String,
<<<<<<< HEAD
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
=======
                required: true,  // Required field
                trim: true,  // Remove extra spaces
            },
            qty: {
                type: Number,
                required: true,  // Required field
                min: 1,  // Minimum quantity must be at least 1
            },
            price: {
                type: Number,
                required: true,  // Required field
                min: 0,  // Price cannot be negative
>>>>>>> ebbef1848e7e985b990a5a3f65ee42e73d455b47
            },
        }],
        MUID: {
            type: String,
<<<<<<< HEAD
            
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
=======
            required: true,  // Required field
        },
    transaction_id : {
        type:String,
        unique: true,
    },
    user_id:String,
    murchant_id : String,
    created_at : String,
    product_id:String,
    payment_id : String,
},{
    timestamps:true
}
)
const transactiondetails=mongoose.model("transaction", transactionModel)
module.exports = transactiondetails
>>>>>>> ebbef1848e7e985b990a5a3f65ee42e73d455b47
