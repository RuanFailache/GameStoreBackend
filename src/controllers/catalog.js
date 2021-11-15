import connection from "../database/database.js";

const getProducts = async(req, res) => {
    
    try{
        const result = await connection.query(`
            SELECT
                "public.products".id,
                "public.products".name,
                "public.products".description,
                "public.products".price,
                "public.products".cover,
                "public.products".banner
            FROM "public.products";
        `);

        res.send(result.rows);
    }
    catch{
        res.sendStatus(500);
    }
}

export { getProducts }