import ListAPI from 'utils/api/ListAPI';
import {
  AppBar,
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

export const getServerSideProps = async (context) => {
  const list = await ListAPI.getListProjects();
  return {
    props: {
      list,
    },
  };
};

export default function Home(props) {
  const { list } = props;
  const router = useRouter();
  const { data: session } = useSession();

  return !session ? (
    <div className="flex flex-col items-center justify-center h-full px-10">
      <div className="flex flex-col items-center">
        <Image
          src="/bongkok.png"
          alt=""
          width={300}
          height={300}
          style={{
            width: 200,
            // width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
        <Image
          src="/logo.webp"
          alt=""
          width={1024}
          height={273}
          objectFit="contain"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
      </div>
      <Button
        variant="outlined"
        onClick={() => signIn()}
        className="rounded-32 px-30 border-onhome text-onhome"
      >
        Sign in
      </Button>
    </div>
  ) : (
    <main className="flex flex-col h-screen w-full">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            LEDONHOME Bangkok Light Monitor
          </Typography>
          {session && (
            <Button color="inherit" onClick={() => signOut()}>
              Sign out
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <List>
        {list.map((item) => {
          return (
            <nav key={item._id}>
              <ListItem
                disablePadding
                onClick={() => {
                  router.push(`/${_.result(item, '_id')}`);
                }}
              >
                <ListItemButton>
                  <ListItemText primary={_.result(item, 'name', 'untitle')} />
                </ListItemButton>
              </ListItem>
              <Divider />
            </nav>
          );
        })}
      </List>
    </main>
  );
}
