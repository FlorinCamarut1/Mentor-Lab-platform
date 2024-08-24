"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { JoinRequestSchema } from "@/schemas";
import { Textarea } from "../ui/textarea";
import { User } from "@prisma/client";
import { useTransition } from "react";
import { joinATeacherReq } from "@/actions/requests/joinATeacherReq";

import toast from "react-hot-toast";
import Loading from "@/app/loading";
import { useRouter } from "next/navigation";

interface JoinTeacherFormProps {
  profileData: User;
  mutateRequestData: () => void;
}

const JoinTeacherForm = ({
  profileData,
  mutateRequestData,
}: JoinTeacherFormProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof JoinRequestSchema>>({
    resolver: zodResolver(JoinRequestSchema),
    defaultValues: {
      projectName: "",
      projectDescription: "",
    },
  });

  const onSubmit = (values: z.infer<typeof JoinRequestSchema>) => {
    startTransition(() => {
      joinATeacherReq(values, profileData.id).then((res) => {
        if (res.success) {
          toast.success(res.success);
          mutateRequestData();
          router.refresh();
        } else {
          toast.error(res.error as string);
        }
      });
    });
  };

  if (isPending) return <Loading />;

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">Înscriere pentru tutore</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="projectName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Numele proiectului tău</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder="Ex: Sistem de irigații inteligent"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="projectDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrie pe scurt proiectul tău</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={isPending}
                    placeholder="Ex: Sistem de irigații inteligent care să ..."
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending}>
            Trimite cererea
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default JoinTeacherForm;
