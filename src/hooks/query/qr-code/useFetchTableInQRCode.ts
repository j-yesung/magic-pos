import { fetchTableInQRCode } from '@/server/api/supabase/qrCode';
import { useQuery } from '@tanstack/react-query';

export const enum QUERY_KEY {
  QR_CODE = 'qrCode',
}

const useFetchTableInQRCode = (userId: string) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: [QUERY_KEY.QR_CODE],
    queryFn: () => fetchTableInQRCode(userId),
  });

  return { data, isError, isLoading };
};

export default useFetchTableInQRCode;
