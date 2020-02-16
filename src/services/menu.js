export async function getLeftMenuData() {
  return [


    {
      title: 'New Campaign',
      key: 'newCampaign',
      url: '/new-campaign',

    },
    {
      title: 'Your Campaigns',
      key: 'allCampaigns',
      url: '/campaigns',

    },
    {
      title: 'Your organisations',
      key: 'allOrganisations',
      url: '/organisations',

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
