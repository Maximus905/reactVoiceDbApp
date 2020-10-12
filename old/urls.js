const DEVELOPED_BASE_URL = 'netcmdb-loc.rs.ru:8082'
// const DEVELOPED_BASE_URL = 'netcmdb.rs.ru'
export const BASE_URL = (() => {
    const protocol = window.location.protocol
    const hostname = window.location.hostname
    const port = window.location.port
    const developMode = true && hostname === 'localhost'
    return developMode ? `${protocol}//${DEVELOPED_BASE_URL}` : `${protocol}//${hostname}${port==='' ? '' : ':'}${port}`
})()

export const TABLE_DATA_URL = `${BASE_URL}/phone/unregisteredInOffice.json`
export const FILTER_DATA_URL = ``
