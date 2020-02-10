export async function getLeftMenuData() {
  return [
    {
      title: 'Settings',
      key: 'settings',
      icon: 'icmn icmn-cog utils__spin-delayed--pseudo-selector',
    },
    {
      title: 'Documentation',
      key: 'documentation',
      url: 'https://docs.cleanuitemplate.com',
      target: '_blank',
      icon: 'icmn icmn-books',
    },
    {
      divider: true,
    },
    {
      title: 'Dashboard Alpha',
      key: 'dashboardAlpha',
      url: '/dashboard/alpha',
      icon: 'icmn icmn-home',
    },
    {
      title: 'New Campaign',
      key: 'newCampaign',
      url: '/new-campaign',
      icon: 'icmn icmn-home',
    },
    {
      title: 'Your Campaigns',
      key: 'allCampaigns',
      url: '/campaigns',
      icon: 'icmn icmn-home',
    },
  ]
}
export async function getTopMenuData() {
  return [
    {
      title: 'Settings',
      key: 'settings',
      icon: 'icmn icmn-cog utils__spin-delayed--pseudo-selector',
    },
    {
      title: 'Docs',
      key: 'documentation',
      url: 'https://docs.cleanuitemplate.com',
      target: '_blank',
      icon: 'icmn icmn-books',
    },
    {
      title: 'Dashboard Alpha',
      key: 'dashboardAlpha',
      url: '/dashboard/alpha',
      icon: 'icmn icmn-home',
    },
  ]
}
