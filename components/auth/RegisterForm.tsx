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
import { editAccountInfo } from "@/actions/editAccountInfo";
import { User } from "@prisma/client";

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
        email: (currentUserData?.email as string) || "",
        name: (currentUserData?.name as string) || "",
        oldPassword: "",
        newPassword: "",
        phoneNumber: currentUserData?.phoneNumber ?? "",
        gitHubUrl: currentUserData?.gitHubUrl ?? "",
        facebookUrl: currentUserData?.facebookUrl ?? "",
        linkedlnUrl: currentUserData?.linkedlnUrl ?? "",
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
        {isEditing && (
          <>
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Număr telefon</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: 0741234567"
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
              name="gitHubUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link GitHub</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: https://github.com/mihaiPop"
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
              name="facebookUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link Facebook</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: https://facebook.com/mihaiPop"
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
              name="linkedlnUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link Linkedln</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: https://linkedln.com/mihaiPop"
                      {...field}
                      isPending={isPending}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
        <Button className="w-full" type="submit" disabled={isPending}>
          {isEditing ? "Editează" : "Crează"}
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
