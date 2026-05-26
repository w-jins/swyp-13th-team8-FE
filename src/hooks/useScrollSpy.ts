import { useState, useEffect } from 'react';

// 화면에 어떤 요소가 보이는지 감지하는 훅
export const useScrollSpy = (ids: { id: string; label: string }[]) => {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // 해당 제목이 화면 교차점에 들어오면 activeId를 업데이트!
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0px 0px -80% 0px' }, // 화면 상단에 걸릴 때 감지되도록 마진 조정
    );

    // 전달받은 id를 가진 요소들을 관찰 시작
    ids.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [ids]);

  return activeId; // 현재 보고 있는 ID 반환
};
