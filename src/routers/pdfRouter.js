import { Router } from "express";
import { pdfService } from "../services/pdfService";
import { login_required } from "../middlewares/login_required";
const path = require("path");

const pdfRouter = Router();

pdfRouter.post(
  "/pdf/create/:portfolioOwnerId",
  login_required,
  async (req, res) => {
    try {
      const user_id = req.params.portfolioOwnerId;
      const { name, email, tel, description } = req.body;
      const data = await pdfService.pdfConverter({
        user_id,
        name,
        email,
        tel,
        description,
      });
      console.log(data);
      res.contentType("application/pdf");
      console.log(__dirname);
      res.sendFile(path.join(__dirname, "../../", data));
    } catch (e) {
      console.log(e);
    }
  }
);
export { pdfRouter };
