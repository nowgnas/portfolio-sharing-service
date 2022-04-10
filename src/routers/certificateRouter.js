import { Router } from "express";
import { certificationService } from "../services/certificateService";
import { login_required } from "../middlewares/login_required";
import { v4 as uuidv4 } from "uuid";
const certificateRouter = Router();

certificateRouter.post(
  "/certificate/create",
  login_required,
  async (req, res) => {
    //create 함수입니다. 프론트엔드로부터 수료한 상장(certName)과 설명(certDescription), 그리고 지은이(author)를 json 객체로 전달받습니다.
    try {
      const { title, user_id, description, date } = req.body;
      const id = uuidv4();
      const result = await certificationService.addCertification({
        id,
        title,
        user_id,
        description,
        date,
      });
      res.status(200).json(result);
    } catch (e) {
      console.log(e);
      res.sendStatus(400);
    }
  }
);

certificateRouter.get(
  `/certificatelist/:user_id`,
  login_required,
  async (req, res) => {
    //read 함수입니다. 프론트엔드로부터 지은이만 전달받습니다.
    try {
      const user_id = req.params.user_id;
      const result = await certificationService.returnAllCertificate({
        user_id,
      });
      res.status(200).json(result);
    } catch (e) {
      console.log(e);
      res.sendStatus(400);
    }
  }
);

certificateRouter.get("/certeficates/:id", login_required, async (req, res) => {
  try {
    const certificateid = req.params.id;
    const result = await certificationService.findCertificate({
      certificateid,
    });
    res.status(200).json(result);
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
});

certificateRouter.delete(
  "/certificates/:id/",
  login_required,
  async (req, res) => {
    try {
      //delete 함수입니다. 지은이와 상장의 이름만 전달받습니다.
      const certificateid = req.params.id;
      const result = await certificationService.deleteOneCertificate({
        certificateid,
      });
      if (result === null) {
        res.send(`There is no Comment anymore`);
        return;
      }
      res.status(200).json(result);
    } catch (e) {
      console.log(e);
      res.sendStatus(400);
    }
  }
);

certificateRouter.put("/certificates/:id", login_required, async (req, res) => {
  const { title, description, date } = req.body;
  const certificateid = req.params.id;
  try {
    const result = await certificationService.updateCertification({
      title,
      certificateid,
      description,
      date,
    });
    if (result === null) {
      res.send("rejected");
      return;
    }
    res.status(200).json(result);
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
});

export { certificateRouter };
