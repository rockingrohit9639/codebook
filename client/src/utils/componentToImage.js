import html2canvas from "html2canvas";

export const componentToImage = async (html) => {
  // Converting HTML to Canvas
  const canvas = await html2canvas(html);

  // Getting base64 image data
  const data = canvas.toDataURL("image/jpg");

  return data;
};
