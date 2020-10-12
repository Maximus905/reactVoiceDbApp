/**@jsx jsx*/
import {jsx} from "@emotion/core";
import {UNREGISTERED_PHONES_TABLE_DATA_URL} from "../../../../constants";
import {DateTimeCell} from "../CustomCells";

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
    tableDataUrl: UNREGISTERED_PHONES_TABLE_DATA_URL,
    filterDataUrl: '',
    showGlobalSearch: false,
    columns: [
        {
            accessor: 'sep',
            title: 'Phone name',
            minWidth: 150,
            maxWidth: 150,
            sortable: false,
            filterable: false,
        },
        {
            accessor: 'sw_port',
            title: 'Switch port',
            minWidth: 100,
            maxWidth: 130,
            sortable: false,
            filterable: false,
        },
        {
            accessor: 'ph_port',
            title: 'Phone port',
            minWidth: 100,
            maxWidth: 130,
            sortable: false,
            filterable: false,
        },
        {
            accessor: 'sw_name',
            title: 'Switch hostname',
            minWidth: 150,
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
        },
        {
            accessor: 'model',
            title: 'Phone model',
            minWidth: 100,
            maxWidth: 300,
            sortable: false,
            filterable: false,
        },
        {
            accessor: 'inventory_number',
            title: 'Inv. number',
            minWidth: 100,
            maxWidth: 300,
            sortable: false,
            filterable: false,
        },
        {
            accessor: 'last_update',
            title: 'Last update',
            minWidth: 150,
            maxWidth: 300,
            sortable: false,
            filterable: false,
            customCell: DateTimeCell
        },
        {
            accessor: 'cdp_last_update',
            title: 'CDP info last update',
            minWidth: 150,
            maxWidth: 300,
            sortable: false,
            filterable: false,
            customCell: DateTimeCell,
            isVisible: false
        },
        {
            accessor: 'is_in_db',
            title: 'Registered in DB',
            isVisible: false,
            minWidth: 100,
            maxWidth: 300,
            sortable: false,
            filterable: false,
        },
    ]
}
