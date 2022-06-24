import { storage } from "../firebaseConfig";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { v4 as uuid } from "uuid";

export const handleUpload = async (image, username = "random") => {
  if (!image) {
    return "Image is required";
  }

  try {
    // Generating random unique id
    const id = uuid();

    // Creating storage ref for storing the file
    const storageRef = ref(storage, `/post-images/${username}/post-${id}.jpg`);

    // Uploading image
    await uploadString(storageRef, image, "data_url", {
      contentType: "image/jpg",
    });

    // Getting the download URL
    const url = await getDownloadURL(storageRef);
    return url;
  } catch (err) {
    console.log(err);
    return "Error uploading image";
  }
};
