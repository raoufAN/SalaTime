import { useContext } from "react";
import { GlobalContext } from "../Global/GlobalContext";

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

/*
هذا ملف اختياري ولكنه يسهل قراءة الكود.
بدلًا من كتابة 
useContext(GlobalContext) في كل مكون، نستدعي فقط useGlobalContext()

*/
