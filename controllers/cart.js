import Cart from "../models/cart.js"
import jsonwebtoken from "jsonwebtoken"
import Product from "../models/Product.js"



export const addCart = async (req, res) => {
    const { users_id, quantity, totalPrice, cartAdd,
        createdAt,
        updatedAt } = req.body
    const id = req.params.id

    const cartData = {
        users_id,
        products_id:id,
        quantity,
        totalPrice,
        cartAdd,
        createdAt,
        updatedAt
    }
    try{
        await cart.create(cartData);
        res.json({
            "message":"cart added"
        }); 
    }catch(err){
        console.log(err);
    }
} 

export const getCart = async (req, res) => {
    const token = req.headers.authorization.split(" ")[1]
    const user = jsonwebtoken.decode(token, 'SHSHSHSHSHSHS')
    const cart = await Cart.findAll({
        where:{
            users_id:user.id
        }
    });

    console.log(cart); 
    if(user) {
        try {
            return res.send(cart);
        } catch (err) {
            console.log(err);
        }
    }else{
        return res.json ({
            "message" : "incorrect token!!"
        })
    }
}

export const getProductByIdCart = async (req, res) => {
    const token = req.headers.authorization.split(" ")[1]
    const user = jsonwebtoken.decode(token, 'SHSHSHSHSHSHS')
    console.log(token);
    
    

    // const cart = await Cart.findAll({
    //     where:{
    //         users_id:user.id
    //     }
    // });

    // const product = await Product.findAll({
    //     where:{
    //         products_id:cart
    //     }
    // })

//    const bangsat = async () => {
//      const x = Promise.all([cart.map((res, index) => {
//         const product = Product.findAll({
//             where: {
//                 id: res.products_id
//             }
//         })
//         return product
//     })]).
//     then((res) => console.log(res))
       
//    } 

//    bangsat()

    if(user) {
        const cart = await Cart.findByPk(user.id, {include:[{
            model: Product,
            as: "products"
        }]
    })
     console.log(cart);
        try {
            return res.send(cart);
        } catch (err) {
            console.log(err);
        }
    }else{
        return res.json ({
            "message" : "incorrect token!!"
        })
    }
}


export const deleteCart = async(req, res) => {
    try {
        await cart.destroy({
            where: {
                cart_id: req.params.id
            }
        });
        res.json({
            "message": "cart deleted"
        });
    }catch (err){
        console.log(err);
    }
}


