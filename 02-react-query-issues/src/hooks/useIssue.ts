import { useQuery } from '@tanstack/react-query';
import { githubApi } from '../apis/githubApi';
import { Issues } from '../issues/interfaces';
import { sleep } from '../helpers/sleep';

export const getIssueInfo = async (issueNumber: number): Promise<Issues> => {
  await sleep(2);
  const { data } = await githubApi.get<Issues>(`issues/${issueNumber}`);

  return data;
};

export const getIssueComments = async (issueNumber: number): Promise<Issues[]> => {
  await sleep(2);
  const { data } = await githubApi.get<Issues[]>(`issues/${issueNumber}/comments`);

  return data;
};

export const useIssue = (issueNumber: number) => {
  const issueQuery = useQuery({
    queryKey: ['issue', issueNumber],
    queryFn: () => getIssueInfo(issueNumber),
  });

  //* Carga en paralelo
  // const commentsQuery = useQuery({
  //   queryKey: ['issue', issueNumber, 'comments'],
  //   queryFn: () => getIssueComments(issueNumber),
  // });

  //* Carga en dependencia.
  const commentsQuery = useQuery({
    queryKey: ['issue', issueNumber, 'comments'],
    queryFn: () => getIssueComments(issueQuery.data!.number),
    enabled: issueQuery.data !== undefined,
  });

  return {
    issueQuery,
    commentsQuery,
  };
};
