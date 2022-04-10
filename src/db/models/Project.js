import { ProjectModel } from "../schemas/project";

class Project{

  static async create({ newProject }) {
    const createdNewProject = await ProjectModel.create(newProject);
    return createdNewProject;
  };

  static async findByObjectId({_id}){
    const getProject = await ProjectModel.findOne({_id});
    return getProject;
  }

  static async projectDelete({projectId}){
    const getDeleteProject = await ProjectModel.findOneAndDelete({"_id":projectId});
    return getDeleteProject;
  }

  static async update({projectId,fieldtoUpdate,newValue}){
    const filter = {"_id" : projectId};
    const update = {[fieldtoUpdate] : newValue};
    const option = { returnOriginal : false};
    
    const updateProject = await ProjectModel.findOneAndUpdate(
      filter,
      update,
      option
    );
     return updateProject;
  }

  static async findByUserId({ user_id }){
    const getProjectList = await ProjectModel.find({user_id : user_id});
    return getProjectList;
  }
}

export { Project };