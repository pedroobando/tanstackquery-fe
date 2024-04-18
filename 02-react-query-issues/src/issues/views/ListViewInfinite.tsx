import { useState } from 'react';
import { IssueList, LabelPicker } from '../components';
import { useIssuesInfinite } from '../../hooks';
import type { IssueState, Issues } from '../interfaces';
import { LoadingIcon } from '../../shared/components/loadingIcon';

export const ListViewInfinite = () => {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [selectedState, setSelectedState] = useState<IssueState>();
  const { issuesQuery } = useIssuesInfinite({
    state: selectedState,
    labels: selectedLabels,
  });

  const onLabelChanged = (labelName: string) => {
    // console.log(labelName);
    selectedLabels.includes(labelName)
      ? setSelectedLabels(selectedLabels.filter((lab) => lab !== labelName))
      : setSelectedLabels([...selectedLabels, labelName]);
  };

  return (
    <section className="row mt-5">
      <div className="col-8">
        {issuesQuery.isLoading ? (
          <LoadingIcon />
        ) : (
          <>
            <IssueList
              state={selectedState}
              onStateChanged={(newState) => setSelectedState(newState)}
              issues={issuesQuery.data?.pages.flat() || []}
            />
          </>
        )}

        <button
          className="btn btn-outline-primary mt-2"
          disabled={!issuesQuery.hasNextPage}
          onClick={() => issuesQuery.fetchNextPage()}
        >
          Load more...
        </button>
      </div>

      <aside className="col-4">
        <LabelPicker
          selectedLabels={selectedLabels}
          onChange={(labelName: string) => onLabelChanged(labelName)}
        />
      </aside>
    </section>
  );
};
