import { useState } from 'react';
import { close, check } from '../../../../assets';
import CImg from '../../../../components/common/CImg';
import { updateUserInfoAPI } from '../../../../api/authApi';
import { useUserStore } from '../../../../store/useUserStore';

const UserInfoModal = ({ onClose }: { onClose: () => void }) => {
  const { userInfo, setUserInfo } = useUserStore();
  const [name, setName] = useState(userInfo.name);

  const handleSave = async () => {
    try {
      await updateUserInfoAPI(name);
      setUserInfo({ ...userInfo, name: name });
      onClose();
    } catch (e) {
      console.error('유저 정보 수정 실패', e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/30">
      {/* 
        모바일(~sm): 화면 하단에서 올라오는 풀스크린 시트
        sm 이상: 중앙 팝업 모달
      */}
      <div
        className="
          w-full sm:w-[520px]
          h-[calc(100%-48px)] sm:h-auto
          bg-white
          rounded-t-[32px] sm:rounded-[32px]
          px-6 pt-7 pb-8 sm:p-10
          relative shadow-2xl
          flex flex-col sm:block
          overflow-y-auto
        "
      >
        {/* 모바일 핸들 */}
        <div className="sm:hidden w-10 h-1 bg-gray-200 rounded-full mx-auto mb-5 shrink-0" />

        {/* 닫기 버튼 */}
        <button onClick={onClose} className="absolute top-6 right-6 sm:top-8 sm:right-8">
          <CImg src={close} alt="닫기" className="w-6 h-6 opacity-40 hover:opacity-100" />
        </button>

        {/* 타이틀 */}
        <h3 className="text-center text-[18px] sm:text-[20px] font-bold mb-7 sm:mb-8 shrink-0">유저 정보</h3>

        {/* 스크롤 가능한 콘텐츠 영역 */}
        <div className="flex-1 sm:flex-none overflow-y-auto sm:overflow-visible">
          {/* 프로필 */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              <div className="w-[84px] h-[84px] sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-gray-scale-10">
                {userInfo?.profileImageUrl ? (
                  <img src={userInfo.profileImageUrl} alt="프로필" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gray-100" />
                )}
              </div>
              <button className="absolute bottom-0 right-0 bg-gray-scale-80 p-1.5 rounded-full border-2 border-white">
                <div className="w-4 h-4 bg-white rounded-sm" />
              </button>
            </div>
            <button className="text-primary-50 text-[12px] font-medium mt-3 leading-tight">기본 이미지로 설정</button>
            <div className="mt-3 text-[20px] sm:text-[22px] font-bold">{userInfo?.name ?? '로딩 중...'} 님</div>
          </div>

          {/* 폼 영역 */}
          <div className="space-y-7">
            {/* 닉네임 */}
            <div>
              <label className="block text-[15px] sm:text-title-h5 font-bold mb-3 sm:mb-5">
                닉네임 <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={10}
                  className="
                    w-full h-[52px] sm:h-[56px]
                    border border-gray-scale-10 rounded-xl
                    px-4 sm:px-5
                    text-[15px] sm:text-[16px]
                    focus:border-primary-50 outline-none
                  "
                />
                <span className="absolute right-4 sm:right-5 top-1/2 -translate-y-1/2 text-gray-scale-40 text-body-s-m">{name.length}/10</span>
              </div>
              <div className="flex items-start gap-1.5 mt-2">
                <img src={check} className="w-[16px] h-[16px] mt-[2px] opacity-60 shrink-0" />
                <p className="text-[12px] sm:text-body-s-m text-gray-scale-50">이모티콘 및 특수기호, 띄어쓰기 사용이 불가합니다.</p>
              </div>
            </div>

            {/* 회원 정보 */}
            <div>
              <label className="block text-[15px] sm:text-title-h5 font-bold mb-4 sm:mb-5">회원 정보</label>
              <div className="space-y-3.5">
                <div className="flex items-center text-[14px] sm:text-[15px]">
                  <span className="text-gray-scale-40 w-14 shrink-0">이름</span>
                  <span className="text-gray-scale-90 font-medium">{userInfo?.name ?? '-'}</span>
                </div>
                <div className="flex items-center text-[14px] sm:text-[15px]">
                  <span className="text-gray-scale-40 w-14 shrink-0">이메일</span>
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0">K</div>
                    <span className="text-gray-scale-90 font-medium truncate">{userInfo?.email ?? '-'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 버튼 영역 — 모바일에서 하단 고정 느낌 */}
        <div className="mt-10 sm:mt-12 space-y-3 shrink-0">
          <button
            onClick={handleSave}
            className="
              w-full h-[54px] sm:h-[60px]
              bg-primary-50 text-white
              font-bold text-[15px] sm:text-[16px]
              rounded-2xl shadow-lg shadow-primary-50/20
              cursor-pointer
            "
          >
            저장하기
          </button>
          <button
            onClick={onClose}
            className="
              w-full h-[50px] sm:h-[60px]
              bg-transparent text-gray-scale-60
              font-bold text-[15px] sm:text-[16px]
              rounded-2xl cursor-pointer
              hover:bg-gray-scale-5
            "
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserInfoModal;
