import { CertificateModel } from "../schemas/certificate";

class Certificate {
  static async addCertificate({ newPost }) {
    // form에서 입력을 받아
    return await CertificateModel.create(newPost);
  }

  static async UpdateOne({ certificateid, title, description, date }) {
    //id는 글 고유의 id;
    const updatedPost = await CertificateModel.findOneAndUpdate(
      { id: certificateid },
      { title, description, date },
      { returnOriginal: false }
    );
    return updatedPost;
  }

  static async findByNameOrId({ title, user_id }) {
    // 수료한 교육의 이름을 받아 찾는 함수입니다. 중복체크등에서 쓰입니다.
    const found = await CertificateModel.findOne({
      // findOne과 find의 차이 메모 find를 사용할때는 obj.length로 체크
      title: title,
      user_id: user_id,
    });
    return found !== null;
  }

  static async findAllPosts({ user_id }) {
    // 한 지은이의 모든 포스트를 찾아 반환해줍니다.
    const foundAll = await CertificateModel.find({ user_id: user_id });
    return foundAll;
  }

  static async deletePost({ certificateid }) {
    // 지은이와 상장의 이름이 일치하는 객체를 골라 삭제하고 그 boolean값을 반환해줍니다.
    const deleted = await CertificateModel.findOneAndDelete({
      id: certificateid,
    });
    return deleted;
  }
  static async findByObjectId({ certificateid }) {
    const result = await CertificateModel.findOne({ id: certificateid });
    return result;
  }
}

export { Certificate };
