"use client";
import { useCallback } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Area } from "react-easy-crop";
import { getCroppedImg } from "@/utils/getCroppedImg";
import { Slider } from "../ui/slider";
import { FaRegEdit } from "react-icons/fa";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";

import axios from "axios";
import Cropper from "react-easy-crop";
import Image from "next/image";
import useImageUploadAndCropStore from "@/store/imageUploadAndCropStore";
import toast from "react-hot-toast";
import Loading from "@/app/loading";

interface ImageUploadAndCropProps {
  currentUserData: User | null;
}

const ImageUploadAndCrop = ({ currentUserData }: ImageUploadAndCropProps) => {
  const router = useRouter();

  const imageUploadStore = useImageUploadAndCropStore();

  const onCropComplete = useCallback(
    (_: Area, croppedAreaPixels: Area) => {
      imageUploadStore.setCroppedAreaPixels(croppedAreaPixels);
    },
    [imageUploadStore],
  );

  const handleCrop = async () => {
    if (!imageUploadStore.imageSrc || !imageUploadStore.croppedAreaPixels)
      return;
    try {
      const croppedImageBlob = await getCroppedImg(
        imageUploadStore.imageSrc,
        imageUploadStore.croppedAreaPixels,
      );

      imageUploadStore.setCroppedImage(croppedImageBlob);
    } catch (error) {
      console.error("Error cropping image:", error);
    }
  };

  const onSubmit = async () => {
    imageUploadStore.setIsLoading(true);
    if (!imageUploadStore.croppedImage) return;

    const formData = new FormData();
    formData.append(
      "file",
      imageUploadStore.croppedImage,
      imageUploadStore.file?.name || "cropped-image.jpg",
    );
    await axios
      .post("/api/uploadProfilePicture", formData)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Imagine încărcată cu succes!");
          imageUploadStore.reset();
          router.refresh();
        }
      })
      .catch((error) => {
        toast.error("Ops! Ceva nu a mers bine. Te rugăm să încerci din nou.");
      })
      .finally(() => imageUploadStore.setIsLoading(false));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    imageUploadStore.reset();

    e.target.value = "";

    const reader = new FileReader();
    reader.onload = () => {
      imageUploadStore.setImageSrc(reader.result as string);
    };
    reader.readAsDataURL(selectedFile);

    imageUploadStore.setFile(selectedFile);

    imageUploadStore.setPopoverOpen(true);
  };

  return (
    <div className="grid w-full items-center justify-center gap-4 rounded-md border-[1px] border-gray-200 p-4 shadow-md">
      {imageUploadStore.isLoading ? (
        <Loading />
      ) : (
        <>
          <Label htmlFor="picture">
            {!currentUserData?.image
              ? "Alege o poză de profil"
              : "Modifică imaginea de profil"}
          </Label>

          <div className="relative h-fit w-fit overflow-hidden rounded-md">
            <Input
              className="hidden"
              id="picture"
              type="file"
              accept=".jpg, .jpeg, .png"
              onChange={handleFileChange}
            />
            <label htmlFor="picture">
              <FaRegEdit
                size={40}
                color="white"
                stroke="black"
                className="absolute right-1/2 top-1/2 -translate-y-1/2 translate-x-1/2 cursor-pointer"
              />
              <Image
                src={
                  (currentUserData?.image as string) ||
                  "/images/placeholder.png"
                }
                alt="Picture"
                width={200}
                height={200}
                priority
                className="cursor-pointer"
              />
            </label>
          </div>

          <Popover
            open={imageUploadStore.popoverOpen}
            onOpenChange={imageUploadStore.setPopoverOpen}
          >
            <PopoverTrigger className="hidden"></PopoverTrigger>
            <PopoverContent className="h-screen w-screen">
              {imageUploadStore.imageSrc && (
                <div className="flex h-full w-full flex-col items-center justify-center gap-4">
                  <div className="relative mb-4 mt-4 h-72 w-full overflow-hidden rounded-lg bg-gray-100 md:max-w-[400px]">
                    <Cropper
                      image={imageUploadStore.imageSrc}
                      crop={imageUploadStore.crop}
                      zoom={imageUploadStore.zoom}
                      aspect={1}
                      onCropChange={imageUploadStore.setCrop}
                      onZoomChange={imageUploadStore.setZoom}
                      onCropComplete={onCropComplete}
                    />
                  </div>
                  <Slider
                    className="w-full md:w-64"
                    value={[imageUploadStore.zoom]}
                    min={1}
                    max={3}
                    step={0.1}
                    aria-labelledby="Zoom"
                    onValueChange={(value: number[]) =>
                      imageUploadStore.setZoom(value[0])
                    }
                  />
                  <Button className="w-full md:w-fit" onClick={handleCrop}>
                    Decupează
                  </Button>
                  {imageUploadStore.croppedImage && (
                    <Button className="w-full md:w-fit" onClick={onSubmit}>
                      Încarcă imaginea decupată
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    className="w-full md:w-fit"
                    onClick={() => imageUploadStore.setPopoverOpen(false)}
                  >
                    Anulează
                  </Button>
                </div>
              )}
            </PopoverContent>
          </Popover>
        </>
      )}
    </div>
  );
};

export default ImageUploadAndCrop;
