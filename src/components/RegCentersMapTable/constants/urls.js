const DEVELOPED_BASE_URL = 'netcmdb-loc.rs.ru:8082'
// const DEVELOPED_BASE_URL = 'netcmdb.rs.ru'
export const BASE_URL = (() => {
    const protocol = window.location.protocol
    const hostname = window.location.hostname
    const port = window.location.port
    const developMode = hostname === 'localhost'
    return developMode ? `${protocol}//${DEVELOPED_BASE_URL}` : `${protocol}//${hostname}${port==='' ? '' : ':'}${port}`
})()

export const TABLE_DATA_URL = `${BASE_URL}/mappingTables/regCentersTableData.json`
export const FILTER_DATA_URL = `${BASE_URL}/mappingTables/regCentersFilterData.json`
export const SAVE_CHANGES_URL = `${BASE_URL}`