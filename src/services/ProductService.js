const Product = require("../models/ProductModel")

const createProduct = (newProduct) =>  {
    return new Promise( async(resolve, reject) => {
        const { name, image, type, price, countInStock, rating, description } = newProduct
       
        try {
            const checkProduct = await Product.findOne({
                name: name
            })
            if (checkProduct !== null) {
                resolve({
                    status: 'OK',
                    message: 'The name of product is already use'
                })
            }
            const NewProduct = await Product.create({
                name, image, type, price, countInStock, rating, description
            })
            if (NewProduct) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: NewProduct
                })
            }
       } catch (e){
           reject(e)
       }
    })   
}

const updateProduct = (productId,data) =>  {
    return new Promise( async(resolve, reject) => {
       try {
            const checkProduct = await Product.findOne({
                _id: productId
            })
            if (checkProduct === null) {
                resolve({
                    status: 'OK',
                    message: 'The Product is not defined',
                })
            }
            const updatedProduct = await Product.findByIdAndUpdate(productId, data, { new: true})
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedProduct
            })
        } catch (e) {
            reject(e)
        }

    })   
}

const deleteProduct = (productId) =>  {
    return new Promise( async(resolve, reject) => {
       try {
            const checkProduct = await Product.findOne({
                _id: productId
            })
            if (checkProduct === null) {
                resolve({
                    status: 'OK',
                    message: 'The product is not defined',
                })
            }
            await Product.findByIdAndDelete(productId)
            resolve({
                status: 'OK',
                message: 'DELETE PRODUCT SUCCESS',
            })
        } catch (e) {
            reject(e)
        }

    })   
}

const getAllProduct = (limit, page, sort, filter) =>  {
    return new Promise( async(resolve, reject) => {
       try {
            const totalProduct = await Product.countDocuments()
            if(filter) {
                const label = filter[0];
                const allProductFilter = await Product.find({ [label] : { '$regex': filter[1] } }).limit(limit).skip(page * limit)
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: allProductFilter,
                    total: totalProduct,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalProduct / limit)
                })
            }
            if(sort) {
                const objectSort = {}
                objectSort[sort[1]] = sort[0]
                const allProductSort = await Product.find().limit(limit).skip(page * limit).sort(objectSort)
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: allProductSort,
                    total: totalProduct,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalProduct / limit)
                })
            }
            const allProduct = await Product.find().limit(limit).skip(page * limit)
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: allProduct,
                total: totalProduct,
                pageCurrent: Number(page + 1),
                totalPage: Math.ceil(totalProduct / limit)
            })
        } catch (e) {
            reject(e)
            console.log(e)
        }

    })   
}

const getDetailsProduct = (productId) =>  {
    return new Promise( async(resolve, reject) => {
       try {
            const product = await Product.findOne({
                _id: productId
            })
            if (product === null) {
                resolve({
                    status: 'OK',
                    message: 'The product is not defined',
                })
            }
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: product
            })
        } catch (e) {
            reject(e)
        }

    })   
}


module.exports = {
    createProduct,
    updateProduct,
    getDetailsProduct,
    deleteProduct,
    getAllProduct
}