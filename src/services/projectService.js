import { Project } from "../db";


class projectService{
    static async addProject({user_id,title,description,from_data,to_data}){
        const newProject ={ user_id, title, description, from_data, to_data};

        const createdNewProject =  await Project.create({newProject});
        createdNewProject.errorMessage=null;
        
        return createdNewProject;
    }

    static async getProject({projectId}){
        const project = await Project.findByObjectId({"_id" :projectId});
        return project;
    }
    
    static async deletProject({projectId}){
        const project = await Project.projectDelete({projectId});
        return project;
    }
    
    static async putProject({update}){
    let project = await Project.findByObjectId({"_id" : update.id});
    const projectId = update.id;
    
    
        if (update.title){
            const projectId = update.id;
            const fieldtoUpdate="title";
            const newValue = update.title;
            project = await Project.update({projectId,fieldtoUpdate,newValue});
        }

        if (update.description){
            const projectId = update.id;
            const fieldtoUpdate="description";
            const newValue = update.description;
            project = await Project.update({projectId,fieldtoUpdate,newValue});
        }

        if (update.from_data){
            const projectId = update.id;
            const fieldtoUpdate="from_data";
            const newValue = update.from_data;
            project = await Project.update({projectId,fieldtoUpdate,newValue});
        }

        if (update.to_data){
            const projectId = update.id;
            const fieldtoUpdate="to_data";
            const newValue = update.to_data;
            project = await Project.update({projectId,fieldtoUpdate,newValue});
        }

        return project;
    }

    static async projectList({ user_id }){
        const project = await Project.findByUserId({ user_id : user_id});
        return project;
    }
    

}

export {projectService}