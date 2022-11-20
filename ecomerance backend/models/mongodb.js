const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1/ecommerce")

const { Schema } = mongoose;


const files = new Schema({
    path: { type: String, required: true },
    mimetype: { type: String, required: true },
    originalname: { type: String, required: true },
    access_type: { type: String, required: true },
    access_users: [{ user_id: { type: Schema.Types.ObjectId, required: true, ref: "user" } }]
}, { timestamps: true, collection: "files" })



const user = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    img: { type: Schema.Types.ObjectId, ref: "files" },
    bio: { type: String },
    password: String,
    contacts: [{
        title: { type: String, required: true },
        number: { type: String, required: true }
    }],
    addresses: [{
        type: { type: String, required: true },
        address: { type: String, required: true }
    }]

}, { timestamps: true, collection: "user" });



const shop = new Schema({
    name: String,
    desc: String,
    icon: String,
    /* created_at: { type: Date, default: () => new Date.now(), immutable: true },
     updated_at: { type: Date, default: () => new Date.now() }*/
}, { timestamps: true, collection: "shop" })

const product_inventory = new Schema({

    quantity: Number,

}, { timestamps: true, collection: "product_inventory" })

const discount = new Schema({
    name: String,
    desc: String,
    discount_percent: Number,
    active: Boolean,
    expire: Date
}, { timestamps: true, collection: "discount" })

const product = new Schema({
    name: { type: String, requierd: true },
    sku: String,
    img: String,
    sale: Number,
    shop: { type: Schema.Types.ObjectId, ref: "shop" },
    product_inventory,
    price: Number,
    desc: String,
    discount_id: { type: Schema.Types.ObjectId, ref: "discount" },

}, { timestamps: true, collection: "product" })

const rate = new Schema({
    product_id: { type: Schema.Types.ObjectId, ref: "product" },
    user_id: { type: Schema.Types.ObjectId, ref: "user" },
    value: Number
}, { timestamps: true, collection: "rate" })


// shopping settion just for tracking the cart 
const shopping_session = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: "user" },
}, { timestamps: true, collection: "shopping_session" })


const cart_item = new Schema({
    session_id: { type: Schema.Types.ObjectId, ref: "shopping_session" },
    product_id: { type: Schema.Types.ObjectId, ref: "product" },
    quantity: Number
}, { timestamps: true, collection: "cart_item" })


const payment_details = new Schema({
    amount: Number,
    provider: String,
    status: String,
}, { timestamps: true })



const orders = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: "user" },
    shipping_address: { type: Schema.Types.ObjectId, ref: "addresses" },
    billing_address: { type: Schema.Types.ObjectId, ref: "addresses" },
    status: { type: String, requierd: true },
    delivery_time: { type: String, requierd: true },
    delivery_fee: { type: Number, default:0.0 },
    tax: { type: Number, default:0.0 },
    payment_details,

}, { timestamps: true, collection: "orders" })

const order_item = new Schema({
    order_id: { type: Schema.Types.ObjectId, ref: "orders" },
    product_id: { type: Schema.Types.ObjectId, ref: "product" },
    quantity: Number,

}, { timestamps: true, collection: "order_item" })


module.exports.files = mongoose.model("files", files)
module.exports.user = mongoose.model("user", user);
module.exports.shop = mongoose.model("shop", shop);
module.exports.discount = mongoose.model("discount", discount);
module.exports.product = mongoose.model("product", product);
module.exports.cart_item = mongoose.model("cart_item", cart_item);
module.exports.orders = mongoose.model("orders", orders);
module.exports.order_item = mongoose.model("order_item", order_item);
module.exports.rate = mongoose.model("rate", rate)
module.exports.shopping_session = mongoose.model("shopping_session", shopping_session)
