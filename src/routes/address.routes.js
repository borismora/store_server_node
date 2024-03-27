import { Router } from "express";
import addressController from "../controllers/address.controller";

const addressRoutes = Router();

/**
 * @swagger
 * tags:
 *   name: Address
 *   description: Operations related to addresses
 * 
 * /address:
 *   post:
 *     summary: Add an address
 *     description: Allows to add an address with fields city, state, neighborhood, and country.
 *     tags: [Address]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               neighborhood:
 *                 type: string
 *               country:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Address added successfully
 *       '400':
 *         description: Error adding the address
 */
addressRoutes.post("/address", addressController.add);

export { addressRoutes };
