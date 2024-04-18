import { useQuery } from '@tanstack/react-query';
import { githubApi } from '../apis/githubApi';
import type { IssueState, Issues } from '../issues/interfaces';
import { sleep } from '../helpers/sleep';
import { useEffect, useState } from 'react';

interface Props {
  state?: IssueState;
  labels?: string[];
  page?: number;
}

const getIssues = async ({ state, labels = [], page = 1 }: Props): Promise<Issues[]> => {
  await sleep(2);
  // const { state, labels } =args

  const params = new URLSearchParams();

  //* Parametro de State
  if (state) params.append('state', state);
  //* Parametro de labels
  if (labels.length > 0) {
    const labelString = labels.join(',');
    params.append('labels', labelString);
  }
  //* Paginacion
  params.append('page', page.toString());
  //* Iten por pagina
  params.append('per_page', '5');

  const { data } = await githubApi.get<Issues[]>('issues', { params });
  return data;
};

export const useIssues = ({ state, labels }: Props) => {
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [state, labels]);

  const issuesQuery = useQuery({
    queryKey: ['issues', { state, labels, page }],
    queryFn: () => getIssues({ state, labels, page }),
  });

  const nextPage = () => {
    if (issuesQuery.data?.length === 0) return;
    setPage((pag) => pag + 1);
  };

  const prevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return {
    issuesQuery,
    page: issuesQuery.isFetching ? 'Loading...' : page,
    nextPage,
    prevPage,
  };
};
