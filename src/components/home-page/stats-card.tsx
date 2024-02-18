"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ReactNode } from "react";

const StatsCard = ({
  title,
  value,
  href,
  icon,
  isLoading = false,
}: {
  title: string;
  value?: number;
  href: string;
  icon: ReactNode;
  isLoading: boolean;
}) => {
  return (
    <Card className='hover:bg-slate-50'>
      <Link href={href}>
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle className='text-sm font-medium'>{title}</CardTitle>
          {icon}
        </CardHeader>

        <CardContent className='font-bold text-2xl'>
          {isLoading ? <b>Loading...</b> : <b>{value}</b>}
        </CardContent>
      </Link>
    </Card>
  );
};

export default StatsCard;
