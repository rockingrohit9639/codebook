import { storage } from "../firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

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
