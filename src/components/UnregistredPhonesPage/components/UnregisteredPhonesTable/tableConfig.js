/**@jsx jsx*/
import {jsx} from "@emotion/core";
import {TABLE_DATA_URL, FILTER_DATA_URL} from "../../constants/urls";

/**
 * Allowed filter types
 */
const ft = {
    EQ: 'EQ',
    NE: 'NE',
    LT: 'LT',
    LE: 'LE',
    GT: 'GT',
    GE: 'GE',
    STARTING: 'STARTING',
    ENDING: 'ENDING',
    INCLUDING: 'INCLUDING',
    LIST: 'LIST'
}

//default loaders are used
export const config = {
    // tableDataLoader: fetchTableData,
    // filterDataLoader: fetchFilterList,
    tableDataUrl: TABLE_DATA_URL,
    filterDataUrl: FILTER_DATA_URL,
    showGlobalSearch: false,
    columns: [
        {
            accessor: 'sep',
            title: 'Hostname',
            minWidth: 100,
            maxWidth: 200,
            sortable: false,
            filterable: false,
        },
        {
            accessor: 'sw_port',
            title: 'Switch port',
            minWidth: 100,
            maxWidth: 200,
            sortable: false,
            filterable: false,
        },
        {
            accessor: 'ph_port',
            title: 'Phone port',
            minWidth: 100,
            maxWidth: 300,
            sortable: false,
            filterable: false,
        },
        {
            accessor: 'sw_ip',
            title: 'Switch IP',
            minWidth: 100,
            maxWidth: 300,
            sortable: false,
            filterable: false,
        }
    ]
}
