import { EducationModel } from "../schemas/education";

class Education {
  // async를 빼고 바로 리턴. 반환값은 promise
  static create({ newEducation }) {
    return EducationModel.create(newEducation);
  }

  static findById({ id }) {
    // id를 기준으로 하나만 찾아야 하므로 findOne을 사용
    return EducationModel.findOne({ id });
  }

  static async findByUserId({ user_id }) {
    return EducationModel.find({ user_id });
  }

  static async update({ id, fieldToUpdate, newValue }) {
    const filter = { id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updateEducation = await EducationModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updateEducation;
  }

  static findBySchool({ user_id, school }) {
    return EducationModel.findOne({ user_id, school });
  }

  static async delete({ id, user_id }) {
    return EducationModel.deleteOne({ id, user_id });
  }
}

export { Education };
