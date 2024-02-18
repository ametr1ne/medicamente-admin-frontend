"use client";

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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { authService } from "@/services/auth/auth.service";
import { TLoginForm } from "@/types/user.type";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { toast } from "sonner";
import { z } from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

const LoginPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { push } = useRouter();

  const { mutate } = useMutation({
    mutationFn: (values: TLoginForm) => authService.login(values),
    onSuccess() {
      toast.success("You have been successfully logged in");
      push("/");
    },
    onError(e) {
      if (axios.isAxiosError(e)) {
        toast.error(e.response?.data.message);
      }
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
  }

  return (
    <main className='min-h-screen w-full flex flex-col justify-center items-center'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <Image
          className='mx-auto h-10 w-auto'
          src={"/Logo-dark.svg"}
          alt={"logo"}
          width={154}
          height={51}
        />
        <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
          Sign in to your account
        </h2>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 rounded-md p-5 mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input placeholder='E-mail' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type='password' placeholder='Password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className='w-full' type='submit'>
            Sign in
          </Button>
        </form>
      </Form>
    </main>
  );
};

export default LoginPage;
