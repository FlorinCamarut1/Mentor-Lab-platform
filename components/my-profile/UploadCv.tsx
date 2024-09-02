"use client";
import pdfToText from "react-pdftotext";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FaFilePdf } from "react-icons/fa6";
import { useState } from "react";
import { Button } from "../ui/button";
import { User } from "@prisma/client";

import axios from "axios";
import toast from "react-hot-toast";
import Loading from "@/app/loading";
import useCvByTeacherId from "@/hooks/CV/useCvByTeacherId";

const UploadCv = ({ currentUserData }: { currentUserData: User | null }) => {
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { mutate: mutateCurrentUserCvData } = useCvByTeacherId(
    currentUserData?.id as string,
  );

  function extractText(event: any) {
    const file = event.target.files[0];
    setFile(file);

    pdfToText(file)
      .then((text) => setText(text))
      .catch((error) => console.error("Failed to extract text from pdf"));
  }

  const handleSubmit = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", file as File);
    formData.append("text", text);
    await axios
      .post("/api/uploadCv", formData)
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.data.success);
          setText("");
          setFile(null);
          setIsLoading(false);
          mutateCurrentUserCvData();
        }
      })
      .catch((error) => {
        toast.error(error.response.data.error);
        setIsLoading(false);
      })
      .finally(() => setIsLoading(false));
  };

  if (isLoading) return <Loading />;

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5 rounded-md border-[1px] border-gray-200 p-4 shadow-md">
      <Label htmlFor="pdf" className="font-medium">
        Încarcă CV-ul tău aici
      </Label>
      <div className="flex items-center gap-2">
        <Input
          onChange={extractText}
          id="pdf"
          type="file"
          accept=".pdf"
          className="flex-1 rounded-md border border-muted bg-muted/5 px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />

        {text && <FaFilePdf size={40} />}
        <Button
          onClick={handleSubmit}
          variant="outline"
          size="sm"
          className="rounded-md px-3 py-1.5 text-sm font-medium transition-colors hover:bg-muted hover:text-primary"
        >
          Încarcă CV
        </Button>
      </div>
    </div>
  );
};

export default UploadCv;
