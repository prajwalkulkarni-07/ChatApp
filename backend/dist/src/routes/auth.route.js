import express from "express";
import { login, logout, signup, getMe } from "../controllers/auth.controller.js";
import protectRoute from "../middleware/protectRoute.js";
const router = express.Router();
router.get("/me", protectRoute, async (req, res, next) => {
    try {
        await getMe(req, res);
    }
    catch (error) {
        next(error);
    }
});
router.post("/signup", async (req, res, next) => {
    try {
        await signup(req, res);
    }
    catch (error) {
        next(error);
    }
});
router.post("/login", login);
router.post("/logout", logout);
export default router;
async function protect(req, res, next) {
    try {
        await protectRoute(req, res, next);
    }
    catch (error) {
        next(error);
    }
}
