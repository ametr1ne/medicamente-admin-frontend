"use client";

import { cn } from "@/lib/utils";
import { AuthContext } from "@/providers/AuthProvider";
import { DollarSign, LogOut, Syringe, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";
import { Button } from "./ui/button";
import { clearStorage } from "@/services/auth/auth.helper";
import { useAuth } from "@/hooks/useAuth";
import { paths } from "@/lib/routes";
import { Separator } from "./ui/separator";

const nav = [
  {
    title: "Услуги",
    href: "/services",
    icon: <Syringe className='w-4 h-4' />,
  },
  {
    title: "Цены",
    href: "/prices",
    icon: <DollarSign className='w-4 h-4' />,
  },
  {
    title: "Специалисты",
    href: "/experts",
    icon: <Users className='w-4 h-4' />,
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  const { user } = useContext(AuthContext);

  const { logout } = useAuth();

  return (
    <aside className='min-h-scren w-[250px] bg-white border-r py-6 flex flex-col fixed left-0 bottom-0 top-0'>
      <div className='w-full flex justify-center mb-6'>
        <Link href={paths.HOME}>
          <Image
            src={"/Logo-dark.svg"}
            className='w-28 h-auto'
            alt={"logo"}
            width={154}
            height={51}
          />
        </Link>
      </div>

      <Separator />

      <nav className='px-5 py-3'>
        <ul className='flex flex-col gap-1'>
          {nav.map(item => (
            <li key={item.title}>
              <Link
                href={item.href}
                className={cn(
                  "flex gap-3 items-center text-sm px-2 rounded-md py-2 hover:bg-blue-100 transition-all duration-200 font-medium",
                  pathname === item.href && "bg-blue-100 text-blue-600"
                )}>
                {item.icon} <span>{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <Separator className='mt-auto' />

      <div className='mt-6 w-full px-5 flex flex-col items-center'>
        <span className='font-medium mb-2'>{user?.email}</span>
        <Button onClick={logout} className='w-full flex gap-3 text-sm'>
          <LogOut className='h-4 w-4' />
          Sign Out
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
