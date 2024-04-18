import { useQuery } from '@tanstack/react-query';
import { githubApi } from '../apis/githubApi';
import { Label } from '../issues/interfaces/label';
import { sleep } from '../helpers/sleep';

const getLabels = async (): Promise<Label[]> => {
  // const res = await fetch('https://api.github.com/repos/facebook/react/labels');
  // const data = await res.json();

  await sleep(2);
  const { data } = await githubApi.get<Label[]>('labels?per_page=100', {
    headers: {
      Authorization: null,
    },
  });
  // console.log(JSON.stringify(data, null, 2));
  return data;
};

export const useLabels = () => {
  const labelsQuery = useQuery({
    queryKey: ['labels'],
    queryFn: getLabels,
    staleTime: 1000 * 60 * 60, // Esto indica que es una hora
    // refetchOnWindowFocus: false,

    // initialData: [],
    // placeholderData: [],
    placeholderData: [
      {
        id: 725156255,
        node_id: 'MDU6TGFiZWw3MjUxNTYyNTU=',
        url: 'https://api.github.com/repos/facebook/react/labels/good%20first%20issue%20(taken)',
        name: 'good first issue (taken)',
        color: 'b60205',
        default: false,
      },
      {
        id: 717031390,
        node_id: 'MDU6TGFiZWw3MTcwMzEzOTA=',
        url: 'https://api.github.com/repos/facebook/react/labels/good%20first%20issue',
        name: 'good first issue',
        color: '6ce26a',
        default: true,
      },
    ],
  });

  return {
    labelsQuery,
  };
};
