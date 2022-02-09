import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import axios from 'axios';
import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface getReturn {
  data: Card[];
  after: number;
}

export default function Home(): JSX.Element {
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    ({ pageParam = null }) =>
      api.get<getReturn>('/api/images', { params: { after: pageParam } }),
    {
      getNextPageParam: result => result.data.after,
    }
  );

  const formattedData = useMemo((): Card[] => {
    return data?.pages.map(page => page.data.data.map(item => item)).flat();
  }, [data]);

  if (isError) return <Error />;

  return (
    <>
      <Header />
      <Box maxW={1120} px={20} mx="auto" my={20}>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <CardList cards={formattedData} />
            {hasNextPage && (
              <Button
                mt={12}
                onClick={() => fetchNextPage()}
                isLoading={isFetchingNextPage}
                loadingText="Carregando..."
              >
                Carregar mais
              </Button>
            )}
          </>
        )}
      </Box>
    </>
  );
}
