import { Area } from "react-easy-crop";
import { create } from "zustand";

interface ImageUploadAndCropStore {
  popoverOpen: boolean;
  setPopoverOpen: (open: boolean) => void;
  file: File | null;
  setFile: (file: File | null) => void;
  imageSrc: string | null;
  setImageSrc: (imageSrc: string | null) => void;
  crop: { x: number; y: number };
  setCrop: (crop: { x: number; y: number }) => void;
  zoom: number;
  setZoom: (zoom: number) => void;
  croppedAreaPixels: Area | null;
  setCroppedAreaPixels: (croppedAreaPixels: Area | null) => void;
  croppedImage: Blob | null;
  setCroppedImage: (croppedImage: Blob | null) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;

  reset: () => void;
}

const useImageUploadAndCropStore = create<ImageUploadAndCropStore>((set) => ({
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
  popoverOpen: false,
  setPopoverOpen: (open) => set({ popoverOpen: open }),
  file: null,
  setFile: (file) => set({ file }),
  imageSrc: null,
  setImageSrc: (imageSrc) => set({ imageSrc }),
  crop: { x: 0, y: 0 },
  setCrop: (crop) => set({ crop }),
  zoom: 1,
  setZoom: (zoom) => set({ zoom }),
  croppedAreaPixels: null,
  setCroppedAreaPixels: (croppedAreaPixels) => set({ croppedAreaPixels }),
  croppedImage: null,
  setCroppedImage: (croppedImage) => set({ croppedImage }),
  reset: () =>
    set({
      isLoading: false,
      popoverOpen: false,
      file: null,
      imageSrc: null,
      crop: { x: 0, y: 0 },
      zoom: 1,
      croppedAreaPixels: null,
      croppedImage: null,
    }),
}));
export default useImageUploadAndCropStore;
