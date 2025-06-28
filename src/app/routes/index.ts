import express from 'express';
import { userRoutes } from '../modules/user/user.routes';
import { authRoutes } from '../modules/auth/auth.routes';
import { categoryRoutes } from '../modules/category/category.routes';
import { subCategoriesRoutes } from '../modules/subCategories/subCategories.routes';
import { brandRoutes } from '../modules/brands/brands.routes';
import { productRoutes } from '../modules/products/products.routes';
const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/category',
    route: categoryRoutes,
  },
  {
    path: '/sub-categories',
    route: subCategoriesRoutes,
  },
  {
    path: '/brands',
    route: brandRoutes,
  },
  {
    path: '/products',
    route: productRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
