import React from 'react';
import ListAPI from 'utils/api/ListAPI';
import _ from 'lodash';
import List from 'components/list';
import { useSession } from 'next-auth/react';

export const getServerSideProps = async (context) => {
  const { alley } = context.query;
  const data = await ListAPI.getListLamp(alley);
  return {
    props: {
      main: _.result(data, 'main', {}),
      list: _.result(data, 'data', []),
    },
  };
};

function Page(props) {
  const { list, main } = props;
  const { data: session } = useSession();
  return <List list={list} main={main} />;
}
export default Page;
Page.auth = true;
