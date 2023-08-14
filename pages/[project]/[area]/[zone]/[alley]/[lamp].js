import React, { useState } from 'react';
import {
  AppBar,
  Button,
  Card,
  CardHeader,
  Dialog,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import ListAPI from 'utils/api/ListAPI';
import _ from 'lodash';
import { useRouter } from 'next/router';
import ImageUploading from 'react-images-uploading';
import Image from 'next/image';
import { ArrowBack, CloseRounded } from '@mui/icons-material';
import UploadAPI from 'utils/api/UploadAPI';
import { useSession } from 'next-auth/react';
import LohGoogleImage from 'components/LohGoogleImage';
import { LoadingButton } from '@mui/lab';

export const getServerSideProps = async (context) => {
  const { lamp } = context.query;
  const data = await ListAPI.getLamp(lamp);
  return {
    props: {
      main: _.result(data, 'main', {}),
      list: _.result(data, 'list', []),
    },
  };
};

function Lamp(props) {
  const { list, main } = props;
  const { data: session } = useSession();
  const router = useRouter();
  const [images, setImages] = React.useState([]);
  const maxNumber = 69;
  const [lamps, setLamps] = useState(list ?? []);
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState({});
  const [loading, setLoading] = useState(false);
  const toggle = (item) => {
    setImage(item);
    try {
      setOpen((prevState) => !prevState);
    } catch (e) {
      setOpen(false);
    }
  };
  const onChange = (imageList) => {
    setImages(imageList);
  };
  const onClickUpload = async (image) => {
    setLoading(true);
    const upload = await UploadAPI.uploadImage({
      image: {
        type: image.file.type,
        data_url: image.data_url,
      },
      lamp_id: _.result(main, '_id', ''),
      email: _.result(session, 'user.email', ''),
    });
    if (_.result(upload, 'data.success', false)) {
      const data = await ListAPI.getLamp(router.query.lamp);
      setLamps(_.result(data, 'list', []));
    }
    setLoading(false);
  };
  return (
    <div className="flex flex-col h-screen w-full">
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
              router.back();
            }}
          >
            <ArrowBack />
          </IconButton>
          <Typography className="w-full py-10" align="center">
            โคม : {_.result(main, 'name', 'untitle')}
          </Typography>
        </Toolbar>
      </AppBar>
      <div className="flex flex-col h-full p-4 items-center">
        <ImageUploading
          multiple={false}
          value={images}
          onChange={onChange}
          maxNumber={maxNumber}
          dataURLKey="data_url"
        >
          {({
            imageList,
            onImageUpload,
            onImageRemoveAll,
            onImageUpdate,
            onImageRemove,
            isDragging,
            dragProps,
          }) => (
            // write your building UI
            <div className="flex flex-col  w-full h-400 items-center ">
              <div className="flex w-fill h-350 min-h-300 border-2">
                {imageList.map((image, index) => (
                  <div
                    key={index}
                    className="flex flex-col justify-between items-center p-4 w-full h-345"
                  >
                    <Image
                      src={image.data_url}
                      alt=""
                      width="300"
                      height="300"
                      className="object-contain h-300"
                    />
                    <div className="flex flex-row justify-around p-4">
                      <LoadingButton
                        loading={loading}
                        className="mr-4"
                        variant="outlined"
                        color="primary"
                        onClick={async () => {
                          await onClickUpload(image);
                          onImageRemove(index);
                        }}
                      >
                        Update
                      </LoadingButton>
                      <LoadingButton
                        loading={loading}
                        variant="outlined"
                        color="error"
                        onClick={() => onImageRemove(index)}
                      >
                        Remove
                      </LoadingButton>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                variant="contained"
                color="info"
                style={isDragging ? { color: 'red' } : null}
                onClick={onImageUpload}
                {...dragProps}
              >
                Select images
              </Button>
            </div>
          )}
        </ImageUploading>
        <Dialog open={open} onClose={toggle} fullScreen>
          <Card className="h-full">
            <CardHeader
              action={
                <IconButton aria-label="settings" onClick={toggle}>
                  <CloseRounded />
                </IconButton>
              }
              title={_.result(image, 'name', 'untitle')}
            />
            <LohGoogleImage
              fileID={_.result(image, 'node_id', '')}
              style={{
                objectFit: 'contain',
                width: '100%',
                height: '90%',
              }}
            />
          </Card>
        </Dialog>
        <div className="flex flex-col items-start w-full">
          <Typography>Photo list</Typography>
          <List className="w-full">
            {lamps.map((item, index) => {
              return (
                <nav key={item._id}>
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() => {
                        toggle(item);
                      }}
                    >
                      <ListItemText primary={`${_.result(item, 'name', 'untitle')}`} />
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                </nav>
              );
            })}
          </List>
        </div>
      </div>
    </div>
  );
}
export default Lamp;
Lamp.auth = true;
