import Axios from 'axios';
import endpoints from 'endpoints';
import messages from './messages';

class ImageService {
  /** Only the Admin is allowed to upload images */
  public async uploadImage(imageFile: File): Promise<string> {
    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await Axios.post(endpoints.UPLOAD_IMAGE, formData).catch(
      err => {
        throw err;
      },
    );

    if (
      response &&
      response.data &&
      response.data.data &&
      response.data.data.url
    )
      return response.data.data.url;
    else throw new Error(messages.cannotUploadImage);
  }
}

export default new ImageService();
