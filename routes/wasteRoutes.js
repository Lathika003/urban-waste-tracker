import express from "express";
import { create, deleteWaste, fetch, update } from "../controller/wasteController.js";

const route = express.Router();

route.get("/getall", fetch);
route.post("/create", create);
route.put("/update/:id", update);
route.delete("/delete/:id", deleteWaste);

export default route;