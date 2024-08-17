"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EditAccountSchema, RegisterSchema } from "@/schemas";
import { register } from "@/actions/register";
import { toast } from "react-hot-toast";
import { useTransition } from "react";
import { login } from "@/actions/login";
import { useSearchParams } from "next/navigation";
import { User } from "@prisma/client";
import { editAccountInfo } from "@/actions/editAccountInfo";

interface RegisterFormProps {
  isEditing?: boolean;
  currentUserData?: User;
}

const RegisterForm = ({
  isEditing = false,
  currentUserData,
}: RegisterFormProps) => {
  const [isPending, startTransition] = useTransition();
  const inviteToken = useSearchParams().get("inviteToken");

  const registerOrEditSchema = z.union([RegisterSchema, EditAccountSchema]);
  const defaultValues = isEditing
    ? {
        email: currentUserData?.email as string,
        name: currentUserData?.name as string,
        oldPassword: "",
        newPassword: "",
      }
    : {
        email: "",
        password: "",
        name: "",
        confirmPassword: "",
      };

  const form = useForm<z.infer<typeof registerOrEditSchema>>({
    resolver: zodResolver(registerOrEditSchema),
    defaultValues: defaultValues,
  });

  const onSubmit = (
    values: z.infer<typeof RegisterSchema> | z.infer<typeof EditAccountSchema>,
  ) => {
    if (!isEditing) {
      const registerValues = values as z.infer<typeof RegisterSchema>;
      startTransition(() => {
        register(registerValues, inviteToken as string | undefined).then(
          (res) => {
            if (res?.success) {
              toast.success(res.success as string);
              login({
                email: registerValues.email,
                password: registerValues.password,
              });
            } else {
              toast.error(res?.error as string);
            }
          },
        );
      });
    } else if (isEditing) {
      const editValues = values as z.infer<typeof EditAccountSchema>;
      startTransition(() => {
        editAccountInfo(editValues).then((res) => {
          if (res?.success) {
            toast.success(res.success as string);
          } else {
            toast.error(res?.error as string);
          }
        });
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nume Complet</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ex: Mihai Pop"
                  {...field}
                  isPending={isPending}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="mihaiPop@example.com"
                  {...field}
                  isPending={isPending}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={isEditing ? "oldPassword" : "password"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{isEditing ? "Parola veche" : "Parolă"}</FormLabel>
              <FormControl>
                <Input
                  placeholder="******"
                  {...field}
                  withEye
                  isPending={isPending}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={isEditing ? "newPassword" : "confirmPassword"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {isEditing ? " Parola nouă" : "Confirmă Parola"}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="******"
                  {...field}
                  withEye
                  isPending={isPending}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit" disabled={isPending}>
          {isEditing ? "Editează" : "Crează"}
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
