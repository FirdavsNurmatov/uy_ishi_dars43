import { Router } from "express";
import { authorMiddleware } from "../middleware/author.middleware.js";
import { createSchema } from "../schema/author.schema.js";
import { roleGuard } from "../middleware/auth.middleware.js";
import {
  createAuthorCon,
  updateAuthorByIdCon,
} from "../controllers/author.controllers.js";
import { createCategoryMidd } from "../middleware/category.middleware.js";
import { updateCategoryByIdCon } from "../controllers/category.controllers.js";
import { loginAdmin, registerAdmin } from "../controllers/auth.controllers.js";

export const authRouter = Router();

authRouter.post("/register", registerAdmin);
authRouter.post("/login", loginAdmin);

authRouter.post(
  "/author",
  roleGuard,
  authorMiddleware(createSchema),
  createAuthorCon
);
authRouter.post(
  "/category",
  roleGuard,
  createCategoryMidd(createSchema),
  createAuthorCon
);

authRouter.put("/author/:authorId", roleGuard, updateAuthorByIdCon);
authRouter.put("/category/:categoryId", roleGuard, updateCategoryByIdCon);
