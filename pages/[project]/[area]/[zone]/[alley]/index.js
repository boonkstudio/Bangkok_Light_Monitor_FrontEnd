import React, { useState } from 'react';
import ListAPI from 'utils/api/ListAPI';
import _ from 'lodash';
import ListComponents from 'components/list';
import { useSession } from 'next-auth/react';
import {
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
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import UploadAPI from 'utils/api/UploadAPI';
import Image from 'next/image';
import { LoadingButton } from '@mui/lab';
import ImageUploading from 'react-images-uploading';
import { CloseRounded } from '@mui/icons-material';
import LohGoogleImage from 'components/LohGoogleImage';

export const getServerSideProps = async (context) => {
  const { alley } = context.query;
  const data = await ListAPI.getListLamp(alley);
  return {
    props: {
      main: _.result(data, 'main', {}),
      list: _.result(data, 'data', []),
      files: _.result(data, 'files', []),
    },
  };
};

function Page(props) {
  const { list, main, files } = props;
  const { data: session } = useSession();
  const router = useRouter();
  const [images, setImages] = React.useState([]);
  const maxNumber = 69;
  const [lamps, setLamps] = useState(files ?? []);
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
      alley_id: _.result(main, '_id', ''),
      email: _.result(session, 'user.email', ''),
    });
    if (_.result(upload, 'data.success', false)) {
      const data = await ListAPI.getListLamp(_.result(main, '_id', ''));
      setLamps(_.result(data, 'files', []));
    }
    setLoading(false);
  };
  return (
    <ListComponents
      list={list}
      main={main}
      Component={() => {
        return (
          <div className="p-10 pb-0 h-fit">
            <Typography className="font-bold">อัพโหลดรูปซอย</Typography>
            <div className="flex flex-col h-fit w-full">
              <ImageUploading
                multiple={false}
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
              >
                {({ imageList, onImageUpload, onImageRemove, isDragging, dragProps }) => (
                  <div className="flex flex-col  w-full h-fit items-center ">
                    <div className="flex w-fill h-fit border-2">
                      {imageList.map((image, index) => (
                        <div
                          key={index}
                          className="flex flex-col justify-between items-center p-4 w-full h-fit"
                        >
                          <Image
                            src={image.data_url}
                            alt=""
                            width="200"
                            height="200"
                            className="object-contain h-200"
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
                      className={imageList.length > 0 ? 'hidden' : ''}
                      variant="contained"
                      color="info"
                      style={isDragging ? { color: 'red' } : null}
                      onClick={onImageUpload}
                      {...dragProps}
                    >
                      upload images
                    </Button>
                  </div>
                )}
              </ImageUploading>
            </div>
            <Typography className="font-bold">Photo list</Typography>
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
            <Divider />
            <Typography className="pt-10 font-bold">รายการโคมไฟ</Typography>
          </div>
        );
      }}
    />
  );
}
export default Page;
Page.auth = true;
