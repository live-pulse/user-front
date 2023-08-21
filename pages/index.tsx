'use clinet';

import { useRouter } from 'next/navigation';
import { Redirection } from '@/components/unused/components';
import { useEffect } from "react";

export default function RedirectHome() {
  const { push } = useRouter();

  useEffect(() => {
    push("/home");
  }, []);
  return <Redirection />;
}
