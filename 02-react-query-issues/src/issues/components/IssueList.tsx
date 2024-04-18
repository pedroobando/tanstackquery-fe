import { FC } from 'react';
import { IssueState, Issues } from '../interfaces';
import { IssueItem } from './IssueItem';

interface Props {
  issues: Issues[];
  state?: IssueState;
  onStateChanged: (selectState?: IssueState) => void;
}

export const IssueList: FC<Props> = ({ issues, state = undefined, onStateChanged }) => {
  return (
    <section className="card border-white">
      <header className="card-header bg-dark">
        <ul className="nav nav-pills card-header-pills">
          <li className="nav-item">
            <a className={`nav-link ${!state ? 'active' : ''}`} onClick={() => onStateChanged()}>
              All
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${state === IssueState.Open ? 'active' : ''}`}
              onClick={() => onStateChanged(IssueState.Open)}
            >
              Open
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${state === IssueState.Closed ? 'active' : ''}`}
              onClick={() => onStateChanged(IssueState.Closed)}
            >
              Closed
            </a>
          </li>
        </ul>
      </header>
      <div className="card-body text-dark">
        {issues.map((issue) => (
          <IssueItem key={issue.id} issue={issue} />
        ))}
      </div>
    </section>
  );
};
