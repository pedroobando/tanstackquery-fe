import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { FiInfo, FiMessageSquare, FiCheckCircle } from 'react-icons/fi';

import { type Issues, IssueState } from '../interfaces';
import { useQueryClient } from '@tanstack/react-query';
import { getIssueComments, getIssueInfo } from '../../hooks';
import { timeSince } from '../../helpers';

// var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime);

interface Props {
  issue: Issues;
}

export const IssueItem: FC<Props> = ({ issue }) => {
  const navegate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = issue;

  const onPrefetchQuery = () => {
    queryClient.prefetchQuery({
      queryKey: ['issue', issue.number],
      queryFn: () => getIssueInfo(issue.number),
    });

    queryClient.prefetchQuery({
      queryKey: ['issue', issue.number, 'comments'],
      queryFn: () => getIssueComments(issue.number),
    });
  };

  const preSetData = () => {
    queryClient.setQueriesData({ queryKey: ['issue', issue.number] }, issue, {
      updatedAt: new Date().getTime() + 100000,
    });
    // queryKey: ['issue', issue.number],
    // queryFn: () => issue,
    // });
  };

  // queryKey: ['issue', issueNumber],
  // queryFn: () => getIssueInfo(issueNumber),

  return (
    <article className="card mb-2 issue">
      <div
        className="card-body d-flex align-items-center"
        onClick={() => navegate(`/issues/issue/${issue.number}`)}
        onMouseEnter={onPrefetchQuery}
      >
        {issue.state == IssueState.Open ? (
          <FiInfo size={30} color="red" />
        ) : (
          <FiCheckCircle size={30} color="green" />
        )}

        <div className="d-flex flex-column flex-fill px-2">
          <span>Suggestion: {issue.title}</span>
          <span className="issue-subinfo">
            {/* #{issue.number} opened {dayjs(issue.created_at).fromNow()} by */}#{issue.number}{' '}
            opened {timeSince(issue.created_at.toString())} a ago by
            <span className="fw-bold"> {user.login}</span>
          </span>
          <div>
            {issue.labels.map((label) => (
              <span
                key={label.id}
                className="badge rounded-pill m-1"
                style={{ backgroundColor: `#${label.color}`, color: 'black' }}
              >
                {label.name}
              </span>
            ))}
          </div>
        </div>

        <div className="d-flex align-items-center">
          <img src={user.avatar_url} alt="User Avatar" className="avatar" />
          <span className="px-2">{issue.comments.toString()}</span>
          <FiMessageSquare />
        </div>
      </div>
    </article>
  );
};
