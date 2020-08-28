const { context } = require('@actions/github');

function buildSlackAttachments({ status, color, github, tag }) {
  const { payload, eventName } = github.context;
  const { owner, repo } = context.repo;
  const event = eventName;

  const sha = event === 'pull_request' ? payload.pull_request.head.sha : github.context.sha;

  return [
    {
      color,
      fields: [
        {
          title: 'Project',
          value: `<https://github.com/${owner}/${repo} | ${repo}>`,
          short: false,
        },
        {
          title: 'Tag',
          value: `<https://github.com/${owner}/${repo}/commit/${tag} | ${tag}`,
          short: true,
        },
        {
          title: 'Status',
          value: `<https://github.com/${owner}/${repo}/commit/${sha}/checks | ${status}>`,
          short: true,
        },
      ],
      footer_icon: 'https://github.githubassets.com/favicon.ico',
      footer: `<https://github.com/${owner}/${repo} | ${owner}/${repo}>`,
      ts: Math.floor(Date.now() / 1000),
    },
  ];
}

module.exports.buildSlackAttachments = buildSlackAttachments;

function formatChannelName(channel) {
  return channel.replace(/[#@]/g, '');
}

module.exports.formatChannelName = formatChannelName;
