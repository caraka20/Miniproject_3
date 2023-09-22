const db = require("./../models");

const {
  addToCart,
  productList,
  cart,
  cartToTransaction,
  transaction,
  createReceipt,
  totalPrice,
  getReceiptByTransactionId
} = require("./../services/transactionService");

module.exports = {
  addProductToCart: async (req, res, next) => {
    try {
      const { idProduct } = req.body;
      const { id } = req.dataToken;
      const product = await productList(idProduct);

      const cartss = await cart();

      const filtered = cartss.filter((value) => {
        return value.dataValues.produk_id == product.dataValues.id;
      });

      console.log(filtered);

      if (filtered.length > 0) {
        throw {
          message: "Product is already exist in the cart",
          isError: true,
        };
      } else {
        const productAddToCart = await addToCart({
          price: product.dataValues.harga,
          produk_id: product.id,
          user_id: id,
          quantity: 1,
        });

        res.status(200).send({
          isError: false,
          message: "Added to Cart Success",
          data: productAddToCart,
        });
      }
    } catch (error) {
      next(error);
    }
  },
  confirm: async (req, res, next) => {
    function getRandomCode() {
      let result = "";
      for (let i = 0; i < 6; i++) {
        const randomDigit = Math.floor(Math.random() * 10);
        result += randomDigit;
      }
      return result;
    }
    try {
      const { cartProduct, uid } = req.body;
      // res.send(cartProduct);

      const transact = await transaction();
      console.log(transact);
      const transaction_id = uid;

      const maps = cartProduct.map((value) => {
        return {
          product_name: value.produk.nama_produk,
          quantity: value.quantity,
          product_price: value.produk.harga,

          transaction_uid: transaction_id,
          user_id: value.user_id,
        };
      });

      const isConfirm = await cartToTransaction(maps);

      res.status(200).send({
        isError: false,
        message: "Transaction Created",
        data: isConfirm,
        dataTransaction: transact,
        transaction_uid: transaction_id,
      });
    } catch (error) {
      next(error);
    }
  },
  productList: async (req, res, next) => {
    try {
      const products = await db.produk.findAll();

      res.status(200).send({
        isError: false,
        message: "Products Found",
        data: products,
      });
    } catch (error) {
      next(error);
    }
  },
  cart: async (req, res, next) => {
    try {
      const getCart = await cart();

      res.status(200).send({
        isError: false,
        message: "Cart Found",
        data: getCart,
      });
    } catch (error) {
      next(error);
    }
  },
  confirmOrder: async (req, res, next) => {
    try {
      const {
        total_price,
        customer_name,
        customer_changes,
        customer_money,
        transaction_uid,
        metode_pembayaran_id,
      } = req.body;
      console.log(customer_money);
      console.log(customer_changes);



      // if (customer_money == null) {
        const dataToSend = {
          total_price: total_price,
          customer_name: customer_name,
          customer_changes: customer_changes,
          customer_money: Number(customer_money),
          transaction_uid: transaction_uid,
          metode_pembayaran_id: metode_pembayaran_id,
          payment_method: null,
        };

        const create = await db.receipt.create(dataToSend);

        res.status(200).send({
          isError: false,
          message: "Transaction Success",
          data: create,
        });
      // }
      //  else {
      //   if (customer_money < total_price) {
      //     throw { message: "Money Cann't less than total price" };
      //   } else {
      //     const dataToSend = {
      //       total_price: total_price,
      //       customer_name: customer_name,
      //       customer_changes: customer_changes,
      //       customer_money: customer_money,
      //       transaction_uid: transaction_uid,
      //       metode_pembayaran_id: metode_pembayaran_id,
      //       payment_method: null,
      //     };

      //     const create = await db.receipt.create(dataToSend);

      //     res.status(200).send({
      //       isError: false,
      //       message: "Transaction Success",
      //       data: create,
      //     });
      //   }
      // }
    } catch (error) {
      next(error);
    }
  },
  total_price: async (req, res, next) => {
    try {
      const { transaction_uid } = req.body;

      const getTransaction = await totalPrice(transaction_uid);

      res.status(200).send({
        isError: false,
        message: "total price",
        data: getTransaction,
      });
    } catch (error) {
      next(error);
    }
  },
  getReceiptByIdTransaction: async (req,res,next) => {
    try {
      const {transaction_id} = req.body 

      const getReceipt = await getReceiptByTransactionId(transaction_id)

      console.log(getReceipt);
      console.log();
    } catch (error) {
      next(error)
    }
  }
};
