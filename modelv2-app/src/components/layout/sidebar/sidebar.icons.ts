import * as Fa from "react-icons/fa";
import * as Fi from "react-icons/fi";
import * as Md from "react-icons/md";
import * as Io from "react-icons/io5";
import * as Ri from "react-icons/ri";
import * as Bi from "react-icons/bi";

const LIBS: Record<string, Record<string, any>> = {
  Fa, Fi, Md, Io, Ri, Bi,
};

export function getIconByName(name?: string) {
  if (!name) return null;
  const prefix = name.slice(0, 2);
  const lib = LIBS[prefix];
  if (!lib) return null;
  return lib[name] ?? null;
}
