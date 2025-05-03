import express from "express";
import router from "./router/user_router.js";
import fileUpload from "express-fileupload";

let PORT = process.env.PORT || 4545;
let app = express()

app.use(express.json());
app.use(fileUpload());
app.use(router)

app.listen(PORT, () => console.log("Server is running ... "));