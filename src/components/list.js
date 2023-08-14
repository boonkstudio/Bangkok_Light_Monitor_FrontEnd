import React from 'react';
import {
  AppBar,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';

function ListComponent(props) {
  const { list, main, Component = () => <></> } = props;
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <main className="flex flex-col h-screen w-full">
      <AppBar
        position="static"
        style={{
          borderRadius: '0px 0px 30px 30px',
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => {
              router.back(router.asPath.split('/').slice(0, -1).join('/'));
            }}
          >
            <ArrowBack />
          </IconButton>
          <Typography className="w-full py-10" align="center" fontWeight="bold">
            {_.result(main, 'name', 'untitle')}
          </Typography>
          {session && (
            <Button color="inherit" onClick={() => signOut()} className="truncate">
              Sign out
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <div className="flex flex-col h-full w-full overflow-scroll">
        <Component />

        <List className="pt-0">
          {(list ?? []).map((item) => {
            return (
              <nav key={item._id}>
                <ListItem
                  disablePadding
                  onClick={() => {
                    router.push(`${router.asPath}/${_.result(item, '_id')}`);
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
      </div>
    </main>
  );
}
export default ListComponent;
