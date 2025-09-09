import multer from "multer";

export const uplode = multer({storage:multer.diskStorage({})})