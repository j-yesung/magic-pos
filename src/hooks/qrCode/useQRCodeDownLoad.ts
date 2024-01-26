import { QRDownload } from "@/server/api/supabase/qrCodeDownLoad";
import { useMutation } from "@tanstack/react-query";

const useQRCodeDownLoad = () => {
  const { mutate,isPending } = useMutation({
    mutationFn: QRDownload
  });

  return {mutate, isPending};
};

export default useQRCodeDownLoad;
