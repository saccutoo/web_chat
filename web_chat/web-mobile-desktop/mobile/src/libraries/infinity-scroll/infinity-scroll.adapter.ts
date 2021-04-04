import { APP_CONFIGS } from 'core/common/app-config';
import { processRequestRespository } from 'core/common/networking/api-helper';
import * as React from 'react';
import { InfinityScrollProps } from './infinity-scroll.props';

const pageSize = APP_CONFIGS.ITEM_PER_PAGE;
// var isFinish: boolean = false;
// const pageSize = 10;
var count: number = 0;

export const InfinityScrollAdapter = (props: InfinityScrollProps) => {
  const [page, setPage] = React.useState<number>(1);
  const [data, setData] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isFinish, setIsFinish] = React.useState<boolean>(false);
 

  React.useEffect(() => {
    setIsLoading(true);
    getData();
  }, [page]);

  React.useEffect(() => {
    console.log('INFINITY SCROLL LOAD DATA :', data);
  }, [data]);

  // get data

  const getData = () => {
    processRequestRespository(
      props.serviceGetData(props.param, { page: page, pageSize: pageSize }),
      (res, totalPages) => {
        setIsLoading(false);
        // hideLoading();
        console.log(
          'INFINITY SCROLL : ',
          page,
          ',-------- isFinish: ',
          isFinish,
          ',-------- res:',
          res,
          '--------- totalPages:',
          totalPages
        );
        // isLoading && setIsLoading(false);
        // const newData: ListChatModel[] = page === 1 ? [...res] : [...dataListChat, ...res];
        const newData: any = page === 1 ? [...res] : [...data, ...res];
        console.log('test_list_user_page_88: ', isFinish);
        setData(newData);
        // isFinish = page >= totalPages;
        if (page >= totalPages) {
          setIsFinish(true);
        }

        // listData = newData;
        // return listData
      }
    );
  };

  // const getDataSuccess = (res: any) => {
  //   setData([...data, ...res]);
  // };

  const onRefresh = () => {
    setPage(1);
    setIsFinish(false);
  };

  const onEndReached = () => {
    if (isFinish) return;
    setPage(page + 1);
    count = count + 1;
    console.log('COUNT : ', count);
  };

  return { data, onEndReached, onRefresh, isLoading, isFinish };
};
