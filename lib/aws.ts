import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

const s3Client = new S3Client({
  region: "eu-north-1",
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_AWS!,
    secretAccessKey: process.env.SECRET_ACCESS_KEY_AWS!,
  },
});

export default s3Client;

export const uploadFileToS3 = async (buffer: Buffer, fileName: string) => {
  const fileType = fileName.split(".").pop();
  const uniqueFileName = `${uuidv4()}.${fileType}`;
  let contentType = "application/octet-stream";

  switch (fileType) {
    case "jpg":
    case "jpeg":
      contentType = "image/jpeg";
      break;
    case "png":
      contentType = "image/png";
      break;
    case "gif":
      contentType = "image/gif";
      break;
    case "pdf":
      contentType = "application/pdf";
      break;
  }

  const command = new PutObjectCommand({
    Bucket: process.env.BUCKET_NAME_AWS!,
    Key: uniqueFileName,
    Body: buffer,
    ContentType: contentType,
    ContentDisposition: "inline",
  });

  await s3Client.send(command);
  const fileUrl = `https://${process.env.BUCKET_NAME_AWS}.s3.eu-north-1.amazonaws.com/${uniqueFileName}`;

  return fileUrl;
};

export const deleteFileFromS3 = async (fileName: string) => {
  try {
    const command = new DeleteObjectCommand({
      Bucket: process.env.BUCKET_NAME_AWS!,
      Key: fileName,
    });

    const response = await s3Client.send(command);
    console.log(`File ${fileName} deleted successfully `);
    return response;
  } catch (error) {
    console.error("Error deleting file: ", error);
    throw new Error("Error deleting file from S3");
  }
};
