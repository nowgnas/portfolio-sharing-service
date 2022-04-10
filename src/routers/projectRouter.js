import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { projectService } from "../services/projectService";

const projectRouter = Router();

projectRouter.post(
  "/project/create",
  login_required,
  async (req, res, next) => {
    try {
      if (is.emptyObject(req.body)) {
        throw new Error(
          "headers의 Content-Type을 application/json으로 설정해주세요"
        );
      }

      const user_id = req.body.user_id;
      const title = req.body.title;
      const description = req.body.description;
      const from_data = req.body.from_data;
      const to_data = req.body.to_data;

      const newProject = await projectService.addProject({
        user_id,
        title,
        description,
        from_data,
        to_data,
      });

      if (newProject.errorMessage) {
        throw new Error(newProject.errorMessage);
      }

      res.status(201).json(newProject);
    } catch (error) {
      next(error);
    }
  }
);

projectRouter.get("/projects/:id", login_required, async (req, res, next) => {
  try {
    const projectId = req.params.id;
    const project = await projectService.getProject({ projectId });

    if (project.errorMessage) {
      throw new Error(project.errorMessage);
    }
    res.status(200).json(project);
  } catch (error) {
    next(error);
  }
});

projectRouter.delete(
  "/projects/:id/delete",
  login_required,
  async (req, res, next) => {
    try {
      const projectId = req.params.id;
      const deleteProject = await projectService.deletProject({ projectId });

      if (deleteProject.errorMessage) {
        throw new Error(deleteProject.errorMessage);
      }

      res.json(deleteProject);
    } catch (e) {
      next(e);
    }
  }
);

projectRouter.put("/projects/:id", login_required, async (req, res, next) => {
  try {
    const id = req.params.id;
    const user_id = null;
    const title = req.body.title ?? null;
    const description = req.body.description ?? null;
    const from_data = req.body.from_data ?? null;
    const to_data = req.body.to_data ?? null;
    const update = { id, title, description, from_data, to_data, user_id };

    const updateProject = await projectService.putProject({ update });

    if (updateProject.errorMessage) {
      throw new Error(updateProject.errorMessage);
    }

    // console.log(updateProject);
    res.json(updateProject);
  } catch (error) {
    next(error);
  }
});

projectRouter.get(
  "/projectlist/:user_id",
  login_required,
  async (req, res, next) => {
    try {
      const user_id = req.params.user_id;
      const projectlist = await projectService.projectList({ user_id });

      if (projectlist.errorMessage) {
        throw new Error(projectlist.errorMessage);
      }

      res.json(projectlist);
    } catch (error) {
      next(error);
    }
  }
);

export { projectRouter };
