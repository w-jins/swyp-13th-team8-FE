export const formatDate = (dateString: Date | string) => {
  if (typeof dateString === 'string') {
    // 앞의 10글자("2026-05-09")만 자른 뒤, 하이픈(-)을 점(.)으로 바꿉니다.
    return dateString.substring(0, 10).replace(/-/g, '.');
  }
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
};
