import axios from "axios";

const uploadInvoiceThumbnail = async (imageData) => {
  const formData = new FormData();
  formData.append("file", imageData);
  formData.append("upload_preset", "test_parshant"); // 🔁 Fixed typo: 'uplad_preset'
  formData.append("cloud_name", "dw85zgcm2");

  try {
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dw85zgcm2/image/upload",
      formData
    );
    return response.data.secure_url; // ✅ You get the image URL here
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    return null;
  }
};

export default uploadInvoiceThumbnail;
