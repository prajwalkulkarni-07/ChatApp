import express, {Request, Response, NextFunction} from "express";
import { login, logout, signup, getMe } from "../controllers/auth.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();


router.get("/me", protectRoute, async (req: Request, res: Response, next: NextFunction) => {
    try {
        await getMe(req, res);
    } catch (error) {
        next(error);
    }
});

router.post("/signup", async (req: Request, res: Response, next: NextFunction) => {
    try {
        await signup(req, res);
    } catch (error) {
        next(error);
    }
});
router.post("/login", login);
router.post("/logout", logout);

export default router;

async function protect(req: Request, res: Response, next: NextFunction)
{
    try{
        await protectRoute(req, res, next);
    }
    catch(error){
        next(error);
    }
}