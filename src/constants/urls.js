const DEVELOPED_BASE_URL = 'netcmdb-loc.rs.ru:8082'
// const DEVELOPED_BASE_URL = 'netcmdb.rs.ru'
export const BASE_URL = (() => {
    const protocol = window.location.protocol
    const hostname = window.location.hostname
    const port = window.location.port
    const developMode = hostname === 'netcmdb-loc.rs.ru' || hostname === 'localhost' || hostname === 'test.rs.ru'
    return developMode ? `${protocol}//${DEVELOPED_BASE_URL}` : `${protocol}//${hostname}${port==='' ? '' : ':'}${port}`
})()
console.log("BASE API URL", BASE_URL)


// Top menu URLs
//internal links
export const DICT_REG_CENTERS_MAPPING= `/vra/rc/mapping`
export const UNREGISTERED_PHONES = `/vra/tools/unregisteredPhones`
export const CUCM_ROUTES = '/vra/tools/cucmRouting'
export const TEST_TOOLS = `/vra/tools/testing`
export const LOGIN_PAGE = `/vra/login`
export const LOGOUT_PAGE = `/vra/logout`
export const LOGOUT_ERROR_PAGE = `/vra/logoutError`
export const URL_AUTH_LOGIN = `${BASE_URL}/auth/login`
export const URL_AUTH_LOGOUT = `${BASE_URL}/auth/logout`
export const URL_REFRESH_TOKEN = `${BASE_URL}/auth/refreshToken`
// Home page
// export const URL_HOME_PAGE = CUCM_ROUTES
export const URL_HOME_PAGE = `${BASE_URL}/locations`
//external links
export const LOCATIONS = `${BASE_URL}/locations`
export const DEVICES = `${BASE_URL}/device/info`
export const PHONES_INFO_URL = `${BASE_URL}/basePhone`
export const PHONES_FIO_URL = `${BASE_URL}/usersPhone`
export const PHONES_REDIRECTED_PHONES_URL = `${BASE_URL}/redirectedPhones`
export const NETWORKS_IPAM = `${BASE_URL}/networks/ipam`
export const REPORTS = `${BASE_URL}/report/new`
export const PHONE_REPORTS_BY_MODELS = `${BASE_URL}/report/phoneStatsReport`
export const PHONE_REPORTS_BY_CLUSTERS= `${BASE_URL}/report/phoneStatsByClustersReport`
export const PHONE_REPORTS_BY_NOT_USED= `${BASE_URL}/report/phoneStatsByNotUsedReport`
export const PHONE_REPORTS_BY_AGENT_LICENSES= `${BASE_URL}/report/agentsPhonesStatsReport`
export const DICT_REGIONS= `${BASE_URL}/admin/regions`
export const DICT_CITIES= `${BASE_URL}/admin/cities`
export const DICT_OFFICE_STATUSES= `${BASE_URL}/admin/officeStatuses`
export const DICT_DEVICES= `${BASE_URL}/admin/devparts`
export const DICT_PORT_TYPES= `${BASE_URL}/admin/portTypes`
export const DICT_VRFS= `${BASE_URL}/admin/vrf`
export const DICT_NETWORKS= `${BASE_URL}/admin/NetworksTab`
export const DICT_HW_LOGS= `${BASE_URL}/log/appliance`
export const DICT_PHONE_LOGS= `${BASE_URL}/log/phone`
// unregistered phones page
export const OFFICE_LIST_URL = `${BASE_URL}/phone/officeList.json`
export const UNREGISTERED_PHONES_TABLE_DATA_URL = `${BASE_URL}/phone/unregisteredInOffice.json`
//for cucm routing page
export const GET_CUCM_LIST = 'http://10.99.120.223:8000/cucm_list/'
export const GET_CUCM_ROUTES = 'http://10.99.120.223:8000/outgoing_routes/'
export const GET_CSS_LIST = 'http://10.99.120.223:8000/css_list/'

