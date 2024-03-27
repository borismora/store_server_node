import { Router } from "express";
import userController from "../controllers/user.controller";
import authMiddleware from "../middlewares/auth.middleware";

const userRoutes = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User operations
 * 
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users from the database.
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     description: The name of the user.
 *                   email:
 *                     type: string
 *                     format: email
 *                     description: The email address of the user.
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: The date and time when the user was created.
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: The date and time when the user was last updated.
 */

userRoutes.get("/users", userController.get);

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User operations
 *
 * /users:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user with the provided name, email, and password.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the user.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: The password of the user.
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
userRoutes.post("/users", userController.add);

//userRoutes.post("/users/address", authMiddleware, userController.addAddress);

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User operations
 *
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     description: Retrieve a user by their unique ID.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: UUID of the user to retrieve
 *         schema:
 *           type: string
 *           format: uuid
 *           example: 123e4567-e89b-12d3-a456-426614174000
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   description: The name of the user.
 *                 email:
 *                   type: string
 *                   format: email
 *                   description: The email address of the user.
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date and time when the user was created.
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date and time when the user was last updated.
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
userRoutes.get("/users/:id", userController.find);

//userRoutes.put("/users", authMiddleware, userController.update);

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Operations related to users
 * 
 * /users/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     description: Delete a user by their unique ID.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to delete
 *         schema:
 *           type: string
 *           format: uuid
 *           example: 123e4567-e89b-12d3-a456-426614174000
 *     responses:
 *       204:
 *         description: No Content
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
userRoutes.delete("/users/:id", userController.delete);

export { userRoutes };
