import { QRDownload } from "@/server/api/supabase/qrCodeDownLoad";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

const useQRCodeDownLoad = () => {
  const { mutate,isPending, isError,error } = useMutation({
    mutationFn: QRDownload
  });

  useEffect(()=>{
    console.log(error)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[isError, error])

  return {mutate, isPending};
};

export default useQRCodeDownLoad;
