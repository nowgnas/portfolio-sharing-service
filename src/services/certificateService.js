import jwt from "jsonwebtoken";
import { Certificate } from "../db";
import dotenv from "dotenv";
dotenv.config();
class certificationService {
  //crud 순으로 재현합니다.

  static async updateCertification({
    certificateid,
    title,
    description,
    date,
  }) {
    const updated = await Certificate.UpdateOne({
      certificateid,
      title,
      description,
      date,
    });
    return updated;
  }
  static async addCertification({
    //create, return 값은 생성된 certificate 객체
    user_id,
    title,
    description,
    id,
    date,
  }) {
    const cert = await Certificate.findByNameOrId({
      title: title,
      user_id: user_id,
    });
    if (cert) {
      const errorMessage =
        "이미 등록한 적이 있습니다. 다른 사항을 입력해주세요.";
      return { errorMessage };
    }

    const newPost = { user_id, title, description, id, date };
    await Certificate.addCertificate({ newPost });
    return newPost;
  }

  static async returnAllCertificate({ user_id }) {
    // read, return 값은 찾아낸 certificate 객체 전부
    const foundAll = Certificate.findAllPosts({ user_id });
    return foundAll;
  }
  static async deleteOneCertificate({ certificateid }) {
    // delete, return값은 지우는데 성공했는지 boolean 값
    const deleted = Certificate.deletePost({ certificateid });
    return deleted;
  }

  static async findCertificate({ certificateid }) {
    // read, return 값은 찾아낸 certificate 객체 전부
    console.log(certificateid);
    const found = await Certificate.findByObjectId({ certificateid });
    console.log(found);
    return found;
  }
}

// 2022.03.16 15:04 테스트 완료

export { certificationService };
