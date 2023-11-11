import express, { Router } from "express";
import { a_protect } from "../middlewares/a_protect";
import { protect } from "../middlewares/protect";

import {
  getAdminServiceList,
  createService,
  getService,
  getServiceList,
  getUserServicePreview,
  editService,
} from "../controllers/servicesController";

const router: Router = express.Router();

// @GET - private - /api/services/
router.get("/", protect, getServiceList);

// @GET - private - /api/services/admin
router.get("/admin", a_protect, getAdminServiceList);

// @POST - private - /api/services/admin
router.post("/admin", a_protect, createService);

// @GET - private - /api/services/:serviceId
router.get("/:serviceId", protect, getUserServicePreview);

// @GET - private - /api/services/admin/:id
router.get("/admin/:id", a_protect, getService);

// @PUT - private = /api/services/admin/:id
router.put("/:serviceId", a_protect, editService);

export default router;
