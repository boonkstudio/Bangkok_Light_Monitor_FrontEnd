import '@/styles/globals.css';
import { SessionProvider, useSession } from 'next-auth/react';
import { CircularProgress } from '@mui/material';
import MuiTheme from 'components/MuiTheme';

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <MuiTheme>
        {Component.auth ? (
          <Auth>
            <Component {...pageProps} />
          </Auth>
        ) : (
          <Component {...pageProps} />
        )}
      </MuiTheme>
    </SessionProvider>
  );
}

function Auth({ children }) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status } = useSession({ required: true });

  if (status === 'loading') {
    return (
      <div className="flex w-full h-full items-center justify-center">
        <CircularProgress color="success" />
      </div>
    );
  }

  return children;
}
