import { useState } from 'react';
import { IssueList, LabelPicker } from '../components';
import { useIssues } from '../../hooks';
import type { IssueState, Issues } from '../interfaces';
import { LoadingIcon } from '../../shared/components/loadingIcon';

export const ListView = () => {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [selectedState, setSelectedState] = useState<IssueState>();
  const { issuesQuery, page, nextPage, prevPage } = useIssues({
    state: selectedState,
    labels: selectedLabels,
  });

  const onLabelChanged = (labelName: string) => {
    // console.log(labelName);
    selectedLabels.includes(labelName)
      ? setSelectedLabels(selectedLabels.filter((lab) => lab !== labelName))
      : setSelectedLabels([...selectedLabels, labelName]);
  };

  // const onStateChanged = (selectState: IssueState | undefined): void => {
  //   setSelectedState(selectState);
  // };

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
              issues={issuesQuery.data || []}
            />
          </>
        )}

        <footer className="d-flex mt-2 justify-content-between aline-items-center">
          <button
            className="btn btn-outline-primary"
            disabled={issuesQuery.isFetching}
            onClick={prevPage}
          >
            Prev
          </button>
          <span>{page}</span>
          <button
            className="btn btn-outline-primary"
            disabled={issuesQuery.isFetching}
            onClick={nextPage}
          >
            Next
          </button>
        </footer>
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
