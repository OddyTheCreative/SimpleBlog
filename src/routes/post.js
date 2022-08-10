import * as postController from "../controllers/posts.js";
const router = express.Router();

router.post("/post", postController.auth, postController.createPost);

export default router;
