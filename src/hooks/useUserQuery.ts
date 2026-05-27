import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '../store/useAuthStore';
import { useUserStore } from '../store/useUserStore';
import { userInfoAPI } from '../api/authApi';

// 유저 정보를 캐싱하는 tanstack 코드
export const useUserQuery = () => {
  const token = useAuthStore((state) => state.accessToken);
  const isNewUser = useAuthStore((state) => state.isNewUser);
  const setUserInfo = useUserStore((state) => state.setUserInfo);

  return useQuery({
    queryKey: ['userInfo', token],
    queryFn: async () => {
      try {
        const res = await userInfoAPI();
        setUserInfo(res.data);

        return res.data;
      } catch (e) {
        setUserInfo({ userId: null, name: '', email: '', profileImageUrl: '' });
        throw e;
      }
    },

    enabled: !!token && !isNewUser,
    staleTime: 1000 * 60 * 5,
  });
};
