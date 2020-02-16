
export default function getUserTypeUrl(userType) {
  console.log('getUserType called', userType)
  switch (userType) {
    case 'organisation':
      return '/organisations/ethHospital'
    default:
      return '/campaigns'
  }
}
