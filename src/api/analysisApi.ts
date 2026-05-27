import { fetchEventSource } from '@microsoft/fetch-event-source';
import api from './axios';
import type { ApiResponse, PageResponse } from '../type/apiType';
import type { HistoryResponse } from '../type/responseType';

const BASE_URL = import.meta.env.VITE_API_URL;
export const sseConnectAPI = async (
  onSuccess: (clientId: string) => void,
  accessToken: string | null,
  onMessage: (event: any) => void,
  signal?: AbortSignal,
) => {
  await fetchEventSource(`${BASE_URL}/api/sse/connect`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'text/event-stream',
    },
    signal: signal,
    // 서버에서 이벤트가 올 때마다 실행됨
    onmessage(event) {
      // 백엔드의 sseEmitters.send(clientId, name: "connected", clientId) 부분 처리
      if (event.event === 'connected') {
        console.log('SSE 연결 성공! 넘어온 ClientId:', event.data);
        onSuccess(event.data); // 컴포넌트로 데이터 전달
      }
      onMessage(event);
    },

    async onopen(res) {
      if (res.ok && res.status === 200) {
        console.log('SSE 커넥션 오픈 완료');
      } else {
        console.error('SSE 연결 실패 (상태 코드 확인)');
      }
    },
    onerror(err) {
      console.error('SSE 에러 발생:', err);
      // 서버가 꺼졌거나 에러가 났을 때 재연결을 원하지 않으면 throw err; 활성화
      return 3000;
    },
  });
};

export const analysisAI = async (accessToken: string | null, file: File | null, clientId: string, insuranId: number | null) => {
  const formData = new FormData();

  if (file) {
    formData.append('file', file);
  }
  if (insuranId !== null && insuranId !== undefined) {
    formData.append('userInsuranceId', String(insuranId));
  }
  formData.append('clientId', clientId);

  const res = await fetch(`${BASE_URL}/api/analysis`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  });

  if (!res.ok) {
    throw new Error('분석 요청 실패');
  }

  return res.json(); // 백엔드의 '요청 접수 완료' 메시지만 받고 끝
};

export const getHistories = async () => {
  const data = await api.get<ApiResponse<PageResponse<HistoryResponse>>>('/history/analysis');
  return data.data.data.content;
};

export const deleteHistory = async (historyId: number) => {
  const data = await api.delete<ApiResponse>(`/history/analysis/${historyId}`);
  return data.data;
};

export const toggleFavorite = async (historyId: number) => {
  const data = await api.patch(`/history/analysis/${historyId}`);
  return data.data;
};
export const getAnalysisHistory = async (historyId: number) => {
  const data = await api.get(`/history/analysis/${historyId}`);
  return data.data;
};
