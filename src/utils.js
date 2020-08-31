const { context } = require('@actions/github');
const { inspect } = require('util');

function buildSlackAttachments({ status, color, tag, projectName }) {
  const { owner, repo } = context.repo;

  console.log('context', inspect(context, { depth: null }));

  return [
    {
      color,
      fields: [
        {
          title: 'Project',
          value: `<https://github.com/${owner}/${repo} | ${projectName || repo}>`,
          short: true,
        },
        {
          title: 'Tag',
          value: `<https://github.com/${owner}/${repo}/commit/${tag} | ${tag}>`,
          short: true,
        },
        {
          title: 'Initiated by',
          value: context.actor,
          short: true,
        },
        {
          title: 'Status',
          value: `<https://github.com/${owner}/${repo}/commit/${tag}/checks | ${status}>`,
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
