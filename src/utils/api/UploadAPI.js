import axios from 'axios';
import Helper from 'helper';

class UploadAPI {
  async uploadImage({ image, lamp_id, alley_id }) {
    try {
      const upload = await axios.post(
        `${
          typeof window !== 'undefined' ? Helper.getAppApi() : Helper.getAppApiPrivate()
        }/upload/file-one`,
        { image, lamp_id, alley_id }
      );
      return upload;
    } catch (e) {
      return null;
    }
  }
}

export default new UploadAPI();
