import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { educationService } from "../services/educationService";

const educationRouter = Router();

// education의 모든 요청은 로그인이 되어 있어야 함

educationRouter.post(
  "/education/create",
  login_required,
  async (req, res, next) => {
    // 학력 생성하기
    try {
      if (is.emptyObject(req.body)) {
        throw new Error(
          "headers의 Content-Type을 application/json으로 설정해주세요"
        );
      }

      // get request datawz
      const user_id = req.currentUserId;
      const school = req.body.school;
      const major = req.body.major;
      const position = req.body.position;
      const newEducation = await educationService.addEducation({
        user_id,
        school,
        major,
        position,
      });

      if (newEducation.errorMessage) {
        throw new Error(newEducation.errorMessage);
      }

      res.status(200).json(newEducation);
    } catch (error) {
      next(error);
    }
    // add education finish
  }
);

educationRouter.get(
  "/educations/:id",
  login_required,
  async (req, res, next) => {
    // 학력 id를 기준으로 확인
    try {
      const id = req.params.id;

      const education = await educationService.getEducation({ id });
      res.status(200).json(education);
    } catch (error) {
      next(error);
    }
    // find education by id finish
  }
);

educationRouter.put(
  "/educations/:id",
  login_required,
  async (req, res, next) => {
    // 학력 id를 기준으로 수정
    try {
      const id = req.params.id;
      const school = req.body.school ?? null;
      const major = req.body.major ?? null;
      const position = req.body.position ?? null;

      const updateEducation = {
        school,
        major,
        position,
      };

      const update = await educationService.setEducations({
        id,
        updateEducation,
      });

      if (update.errorMessage) {
        throw new Error(update.errorMessage);
      }

      res.status(201).json(update);
    } catch (error) {
      next(error);
    }
  }
);

educationRouter.get(
  "/educationlist/:id",
  login_required,
  async (req, res, next) => {
    // 사용자 id를 기준으로 확인
    try {
      const user_id = req.params.id;
      const educations = await educationService.getEducations({ user_id });

      if (educations.errorMessage) {
        throw new Error(educations.errorMessage);
      }

      res.status(200).json(educations);
    } catch (error) {
      next(error);
    }
  }
);

educationRouter.delete(
  "/educationDelete/:id",
  login_required,
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const user_id = req.currentUserId;

      const del = await educationService.deleteEducation({ id, user_id });

      if (del.errorMessage) {
        throw new Error(del.errorMessage);
      }

      res.status(200).json({ status: "succ" });
    } catch (error) {
      next(error);
    }
  }
);

export { educationRouter };
