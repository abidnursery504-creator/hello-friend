import { site } from "@/data/site";

export const formatBDT = (n: number) =>
  `${site.currency}${n.toLocaleString("en-IN")}`;

export const formatBn = (n: number) => {
  const en = "0123456789";
  const bn = "০১২৩৪৫৬৭৮৯";
  return n.toString().split("").map((d) => {
    const i = en.indexOf(d);
    return i >= 0 ? bn[i] : d;
  }).join("");
};
