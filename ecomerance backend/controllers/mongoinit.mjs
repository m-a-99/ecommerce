
import mongoose, { Schema } from 'mongoose';
import { orders, order_item, user } from '../models/mongodb.js';
import util from 'util'
// await product_category.deleteMany({})
// await shop.insertMany([{
//     "_id": "635555fab4ee4dabc546e9de",
//     "name": "makeup",
//     "desc": "bbbbbbb",
//     "icon": "fa-lips",
//     "iconType": "fontawsome"
// }, {
//     "name": "clothes",
//     "desc": "aaaaa",
//     "icon": "fa-clothes-hanger",
//     "iconType": "fontawsome"
// },
// {
//     "name": "technology",
//     "desc": "aaaaa",
//     "icon": "fa-laptop-mobile",
//     "iconType": "fontawsome"
// },
// {
//     "name": "furniture",
//     "desc": "aaaaa",
//     "icon": "fa-loveseat",
//     "iconType": "fontawsome"
// }])
// console.log(await product.deleteMany({}))

// await product.insertMany([{
//     name: "aket",
//     desc: "a",
//     sku: "a",
//     img:"/products/img1.jpg",
//     rate:4.3,
//     sale:20,
//     product_category_id: "635555fab4ee4dabc546e9de",
//     price: 200,
// },
// {
//     name: "jacket",
//     desc: "b",
//     sku: "b",
//     img: "/products/img2.jpg",
//     rate:4.3,
//     sale:20,
//     product_category_id: "635555fab4ee4dabc546e9de",
//     price: 200,
// },
// {
//     name: "jacket",
//     desc: "c",
//     sku: "c",
//     img: "/products/img3.jpg",
//     rate:4.3,
//     sale:20,
//     product_category_id: "635555fab4ee4dabc546e9de",
//     price: 200,
// },
// {
//     name: "jacket",
//     desc: "d",
//     sku: "d",
//     img: "/products/img4.jpg",
//     rate:4.3,
//     sale:20,
//     product_category_id: "635555fab4ee4dabc546e9de",
//     price: 200,
// },
// {
//     name: "jacket",
//     desc: "e",
//     sku: "e",
//     img: "/products/img5.jpg",
//     rate:4.3,
//     sale:20,
//     product_category_id: "635555fab4ee4dabc546e9de",
//     price: 200,
// },
// ])

// let desc= "d2"
// console.log(await product.findOne({ desc }))


// await addresses.insertMany([
//     {
//         _id: "6363382dbb5cc4aae62183f9",
//         type: "billing",
//         address: "2231 Kidd Avenue, AK, Kipnuk, 99614, United States",
//         user_id: "637040e1ce072d689fd22e72"
//     },
//     {
//         _id: "6363382dbb5cc4aae62183f8",
//         type: "shipping",
//         address: "2148 Straford Park, KY, Winchester, 40391, United States",
//         user_id: "637040e1ce072d689fd22e72"
//     }])


// await orders.insertMany([{
//     _id: '6363382dbb5cc4aae62183f7',
//     user_id: "637040e1ce072d689fd22e72",
//     shipping_address: "6363382dbb5cc4aae62183f8",
//     blilling_address: "6363382dbb5cc4aae62183f9",
//     status: "1",
//     payment_details: {
//         amount: 100,
//         provider: "stripe",
//         status: "verified",
//     }

// }])


// await order_item.insertMany(
//     [
//         {
//             order_id: "6363382dbb5cc4aae62183f7",
//             product_id: "6355c40a1f14138fef84cdb4",
//             quantity: 2
//         },
//         {
//             order_id: "6363382dbb5cc4aae62183f7",
//             product_id: "6355c40a1f14138fef84cdb5",
//             quantity: 1
//         },
//         {
//             order_id: "6363382dbb5cc4aae62183f7",
//             product_id: "6355c40a1f14138fef84cdb6",
//             quantity: 3
//         }
//     ]
// )

// let data = await user.aggregate([

//     {
//         "$lookup": {
//             "from": "addresses",
//             "localField": "_id",
//             "foreignField": "user_id",
//             "as": "R",

//         }
//     },
// //    { "$unwind": "$R" },

//     {
//         "$match": {
//             "_id":mongoose.Types.ObjectId('637040e1ce072d689fd22e72')
//         }
//     },



//     // {
//     //     "$project": {
//     //         "R":"$R._id","_id":1

//     //     }
//     // }

// ])
// console.log(data)

// const _user = await user.findById("637040e1ce072d689fd22e73")
// //  _user.firstName="mohammed2";
// // await _user.save()
// console.log(_user)

// const _user=new user();
// _user.firstName="aaa";
// _user.lastName="www";
// _user.email="aqaq";
// _user.password="wwwwwwwwwwwww"
// await _user.save();

// const _info = await user.aggregate([
//     {
//         "$lookup": {
//             "from": "addresses",
//             "localField": "_id",
//             "foreignField": "user_id",
//             "as": "adresses"
//         }
//     },
//     {
//         "$lookup": {
//             "from": "files",
//             "localField": "img",
//             "foreignField": "_id",
//             "as": "image_file"
//         }
//     },
//     { "$match": { "_id": mongoose.Types.ObjectId("637040e1ce072d689fd22e72") } }
// ])

// console.log(_info)
// let _u = await user.findById("637040e1ce072d689fd22e72",{_id:0})
// console.log(_u)


const order = await orders.aggregate([
    {
        "$lookup": {
            "from": "order_item",
            "localField": "_id",
            "foreignField": "order_id",
            "as": "order_items",
            "pipeline": [{
                "$lookup": {
                    "from": "product",
                    "localField": "product_id",
                    "foreignField": "_id",
                    "as": "product_info"
                }
            }]
        }
    },
    {
        "$lookup": {
            "from": "user",
            "localField": "user_id",
            "foreignField": "_id",
            "as": "user",
        }
    },
    { "$unwind": "$user" },
    {
        "$addFields": {
            "shipping_address": {
                "$filter": {
                    "input": "$user.addresses",
                    "as": "address",
                    "cond": {  "$eq": ["$$address._id", "$shipping_address"]  },
                }
            }
        }
    },
        {
        "$addFields": {
            "billing_address": {
                "$filter": {
                    "input": "$user.addresses",
                    "as": "address",
                    "cond": {   "$eq": ["$$address._id", "$billing_address"]  },
                }
            }
        }
    }

    , { "$unwind": "$billing_address" },
    { "$unwind": "$shipping_address" },
    { "$project": { "user": 0 } },
    
    // {
    //     "$project": {
    //         "_id": 1,
    //         "user_id": 1,
    //         "status": 1,
    //         "payment_details": 1,
    //         "createdAt": 1,
    //         "updatedAt": 1,
    //         "order_items": 1,
    //         "addresses": {
    //             "$filter": {
    //                 "input": "$addresses",
    //                 "as": "address",
    //                 "cond": { "$or": [{ "$eq": ["$$address._id", "$shipping_address"] }, { "$eq": ["$$address._id", "$blilling_address"] }] },
    //             }
    //         }
    //     }
    // }

    // { "$project": { "blilling_address": 1, "shipping_address": 1, "addresses": "$user.addresses" } },

    // { "$unwind": "$addresses" },

    // { "$match": { "$expr": { "$or": [{ "$eq": ["$addresses._id", "$shipping_address"] }, { "$eq": ["$shipping._id", "$blilling_address"] }]} } }
    // ,{"$group":{
    //     "_id": "$_id",
    //     "shipping_address":{"$first":"$shipping_address"},
    //     "blilling_address": { "$first": "$blilling_address" },


    //     "addresses": { "$push":"$addresses"}
    // }}
])


// const order=await orders.find({});
console.log(order[0])
//console.log(util.inspect(order, { showHidden: false, depth: null, colors: true, }))
await mongoose.connection.close()