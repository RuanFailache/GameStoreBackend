import joi from "joi";

const purchaseSchema = joi.object({
    userId: joi.number().integer().min(1).required(),
    paymentMethod: joi.string().required,
});

export { purchaseSchema }