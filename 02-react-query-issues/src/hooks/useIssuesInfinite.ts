import { useInfiniteQuery } from '@tanstack/react-query';
import { githubApi } from '../apis/githubApi';
import { sleep } from '../helpers';
import { IssueState, Issues } from '../issues/interfaces';

interface Props {
  state?: IssueState;
  labels?: string[];
  page?: number;
}

interface QueryProps {
  pageParam?: number;
  queryKey: (string | Props)[];
}

const getIssues = async ({ pageParam = 1, queryKey }: QueryProps): Promise<Issues[]> => {
  const [, , args] = queryKey;
  const { state, labels = [] } = args as Props;

  // await sleep(2);
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
  params.append('page', pageParam.toString());
  //* Iten por pagina
  params.append('per_page', '5');

  const { data } = await githubApi.get<Issues[]>('issues', { params });
  return data;
};

export const useIssuesInfinite = ({ state, labels }: Props) => {
  const issuesQuery = useInfiniteQuery({
    queryKey: ['issues', 'infinite', { state, labels }],
    queryFn: (data) => getIssues(data),
    initialPageParam: 0,
    getNextPageParam: (lastPage, page) => {
      if (lastPage.length === 0) return;

      return page.length + 1;
    },
  });

  return {
    issuesQuery,
  };
};
