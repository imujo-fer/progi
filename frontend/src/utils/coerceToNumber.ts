import { notFound } from "@tanstack/react-router";
import { z } from "zod";

export const coerceToNumber = (param: string) => {
  const paramNumber = z.coerce.number().safeParse(param);

  if (paramNumber.error) {
    throw notFound();
  }

  return paramNumber.data;
};
