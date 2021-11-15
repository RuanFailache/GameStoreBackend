import connection from "../database/database.js";

const getProducts = async(req, res) => {
    
    try{
        const result = await connection.query(`
            SELECT
                products.id,
                products.name,
                products.description,
                products.price,
                products.cover,
                products.banner
            FROM products;
        `);

        res.send(result.rows);
    }
    catch{
        res.sendStatus(500);
    }
}

export { getProducts }