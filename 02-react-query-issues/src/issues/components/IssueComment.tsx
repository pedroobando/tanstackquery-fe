import { FC } from 'react';
import Markdown from 'react-markdown';
import { Issues } from '../interfaces';

interface Props {
  issue: Issues;
}

export const IssueComment: FC<Props> = ({ issue }) => {
  return (
    <div className="col-12">
      <div className="card border-white mt-2">
        <div className="card-header bg-dark">
          <img
            src={issue.user.avatar_url}
            // src="https://avatars.githubusercontent.com/u/1933404?v=4"
            alt="User Avatar"
            className="avatar"
          />
          <span className="mx-2">{issue.user.login} commented</span>
        </div>
        <div className="card-body text-dark">
          <Markdown>{issue.body!}</Markdown>
        </div>
      </div>
    </div>
  );
};
