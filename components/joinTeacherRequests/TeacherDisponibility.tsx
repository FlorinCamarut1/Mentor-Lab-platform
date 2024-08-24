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
import { Switch } from "@/components/ui/switch";
import { toast } from "react-hot-toast";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useTeacherAcceptedStudents } from "@/hooks/teachers/useTeacherAcceptedStudents";
import { Input } from "../ui/input";
import { Suspense, useEffect, useState, useTransition } from "react";
import { toggleTeacherDisponibility } from "@/actions/requests/toggleTeacherDisponibility";

import Loading from "@/app/loading";

interface TeacherDisponibilityProps {
  teacherId: string | undefined;
}
const TeacherDisponibility = ({ teacherId }: TeacherDisponibilityProps) => {
  const { data, mutate } = useTeacherAcceptedStudents(teacherId as string);
  const [popOverOpen, setPopoverOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const TeacherDisponibilitySchema = z.object({
    availability: z.boolean().default(false).optional(),
    maxNumberOfStudents: z.string().optional(),
  });

  const form = useForm<z.infer<typeof TeacherDisponibilitySchema>>({
    resolver: zodResolver(TeacherDisponibilitySchema),
    defaultValues: {
      availability: !!data?.[0] || false,
      maxNumberOfStudents: data?.[0]?.maxNumberOfStudents || 0,
    },
  });

  const onSubmit = (values: z.infer<typeof TeacherDisponibilitySchema>) => {
    startTransition(() => {
      toggleTeacherDisponibility(Number(values.maxNumberOfStudents)).then(
        (res) => {
          if (res.success) {
            toast.success(res.success);
            mutate();
          } else {
            toast.error(res.error as string);
          }
        },
      );
    });
  };
  useEffect(() => {
    if (data) {
      form.reset({
        availability: !!data?.[0],
        maxNumberOfStudents: data?.[0]?.maxNumberOfStudents || 0,
      });
    }
  }, [data, form]);

  return (
    <Suspense fallback={<Loading />}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-fit space-y-6"
        >
          <div className="flex items-center gap-2">
            <FormField
              control={form.control}
              name="availability"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Disponibilitate mentorat
                    </FormLabel>
                    <FormDescription>
                      Bifează disponibilitatea ta ca și mentor, adaugă un număr
                      maxim de studenți pe care ai dori să îi mentorezi.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Popover
              open={
                (!data?.[0] && form.getValues("availability")) || popOverOpen
              }
              onOpenChange={setPopoverOpen}
            >
              <PopoverTrigger asChild>
                <Button onClick={() => setPopoverOpen(!popOverOpen)}>
                  Modifică
                </Button>
              </PopoverTrigger>
              <PopoverContent className="space-y-2">
                <FormField
                  control={form.control}
                  name="maxNumberOfStudents"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Număr maxim de studenți pentru mentorat
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="0"
                          type="number"
                          min={0}
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button onClick={form.handleSubmit(onSubmit)}>Modifică</Button>
              </PopoverContent>
            </Popover>
          </div>
        </form>
      </Form>
    </Suspense>
  );
};

export default TeacherDisponibility;
