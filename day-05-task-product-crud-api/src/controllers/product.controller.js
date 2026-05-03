let products = require("../data/productData");

// CREATE Product
const createProduct = async(req, res) => {
  try {
    const { name, price, description, category, stock } = req.body;

    if (!name || !price || !description || !category || !stock) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newProduct = {
      id: products.length + 1,
      name,
      price,
      description,
      category,
      stock,
      createdAt: new Date(),
    };

    products.push(newProduct);

    res.status(201).json({
      success: true,
      message: "Product Created Successfully",
      product: newProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET All Products
const getAllProduct = async(req, res) => {
  try {
    // res.send("Product API is running");

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET Single Product
const getSingleProduct = async(req, res) => {
  try {
    const product = await products.findById(req.params.id)

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE Product
const updateProduct = async(req, res) => {
  try {
    const product = await products.findById(req.params.id)

    if(!product){
    return res.status(400).json({
      message:"Product Not Found"
    })
    }

    product.name = req.body.name;
    product.price = req.body.price;
    product.description = req.body.description;
    product.category = req.body.category;
    product.stock = req.body.stock;

    await product.save();

    res.status(200).json({
      success: true,
      message: "Product Updated Successfully",
      product: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE Product
const deleteProduct = async(req, res) => {
  try {
    const product = await products.findById(req.params.id)

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

  await product.findByIdAndDelete(req.params.id);
  
    res.status(200).json({
      success: true,
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createProduct,
  getAllProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
