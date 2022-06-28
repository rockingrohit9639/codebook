import { storage } from "../firebaseConfig";
import {
  ref,
  uploadString,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { v4 as uuid } from "uuid";

// Uploading base64 image to firebase storage
export const handleBase64Upload = async (image, username = "random") => {
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

// Uploading profile image of the user
export const handleProfilePhotoUpload = async (
  image,
  username = "random",
  setLoading
) => {
  if (!image) {
    return null;
  }

  try {
    setLoading(true);
    // Creating ref for uploading file
    const storageRef = ref(storage, `/profile-images/${username}.jpg`);

    // Uploading image
    await uploadBytesResumable(storageRef, image, {
      contentType: "image/jpg",
    });

    // Getting download url
    const downloadURL = await getDownloadURL(storageRef);
    setLoading(false);
    return downloadURL;
  } catch (err) {
    console.log(err);
    return null;
  }
};
