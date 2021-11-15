import connection from "../database.js";

const postPurchase = async (req, res) => {

    const { userId, paymentMethod, products } = req.body;

  
    if (!products || !userId || !paymentMethod || products.length === 0) {
      res.sendStatus(400);
      return;
    }


  
    try {
      const purchase = await connection.query(`
            INSERT INTO purchases 
                ("user-id", "payment-method") 
            VALUES ($1, $2) RETURNING id
        `, [userId, paymentMethod]);

      const purchaseId = purchase.rows[0].id;
  
      products.forEach(async (product) => {
        await connection.query(`
            INSERT INTO 
                purchases_products ("purchase-id", "product-id", amount) 
            VALUES ($1, $2, $3)
        `, [purchaseId, product.productId, product.amount]);
      });

      res.sendStatus(200);

    } catch {
      res.sendStatus(500);
    }
  };

  export { postPurchase }