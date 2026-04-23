import { GOOGLE_CLIENT_ID } from '@/config/env';

const SCOPES = 'email profile openid';

declare global {
  interface Window {
    google?: {
      accounts: {
        oauth2: {
          initTokenClient: (config: {
            client_id: string;
            scope: string;
            callback: (resp: { error?: string; access_token?: string }) => void;
          }) => { requestAccessToken: () => void };
        };
      };
    };
  }
}

let sdkPromise: Promise<void> | null = null;

function waitForSdk(): Promise<void> {
  if (sdkPromise) return sdkPromise;
  sdkPromise = new Promise((resolve, reject) => {
    let tries = 0;
    const poll = () => {
      if (window.google?.accounts?.oauth2) return resolve();
      if (++tries > 50) return reject(new Error('Google SDK 加载超时'));
      setTimeout(poll, 100);
    };
    poll();
  });
  return sdkPromise;
}

export async function requestGoogleAccessToken(): Promise<string> {
  await waitForSdk();
  return new Promise((resolve, reject) => {
    const client = window.google!.accounts.oauth2.initTokenClient({
      client_id: GOOGLE_CLIENT_ID,
      scope: SCOPES,
      callback: (resp) => {
        if (resp.error) return reject(new Error(resp.error));
        if (!resp.access_token) return reject(new Error('no access_token'));
        resolve(resp.access_token);
      },
    });
    client.requestAccessToken();
  });
}
