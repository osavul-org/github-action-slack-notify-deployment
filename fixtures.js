const repository = {
  name: 'github-action-slack-notify-build',
  owner: {
    login: 'discontract',
  },
};

export const GITHUB_PUSH_EVENT = {
  context: {
    payload: {
      repository,
    },
    ref: 'refs/heads/my-branch',
    workflow: 'CI',
    eventName: 'push',
    sha: 'abc123',
  },
};

export const GITHUB_PR_EVENT = {
  context: {
    payload: {
      repository,
      pull_request: {
        html_url: 'https://github.com/Discontract/github-action-slack-notify-deployment/pulls/1',
        title: 'This is a PR',
        head: {
          ref: 'my-branch',
          sha: 'xyz678',
        },
      },
    },
    workflow: 'CI',
    eventName: 'pull_request',
    sha: 'abc123',
  },
};
