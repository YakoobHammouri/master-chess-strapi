import getTrad from "./getTrad";
import { useGlobalContext } from "strapi-helper-plugin";

export default function (t) {
  const { formatMessage } = useGlobalContext();
  const temp = formatMessage({ id: getTrad(t) });
  if (temp === getTrad(t)) {
    return t;
  }
  return temp;
}
