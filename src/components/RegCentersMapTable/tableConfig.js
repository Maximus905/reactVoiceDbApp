/**@jsx jsx*/
import {jsx} from "@emotion/core";
import {TABLE_DATA_URL, FILTER_DATA_URL} from "./constants/urls";
import {DropdownEditor} from "@maximus905/simple-table"

const RegCenterEditor = props => <DropdownEditor minWidthOfList={200} {...props}/>
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
    // saveChangesUrl: 'http://netcmdb-loc.rs.ru:8082/test/mockingSaveChanges.json',
    showGlobalSearch: false,
    columns: [
        {
            accessor: 'lotus_id',
            title: 'Lotus ID',
            minWidth: 100,
            maxWidth: 100,
            sortable: true,
            filterable: true,
            filter: {
                filterBy: 'lotus_id',
                type: ft.EQ,
                allowedTypes: [ft.EQ]
            }
        },
        {
            accessor: 'city',
            title: 'Город',
            minWidth: 100,
            maxWidth: 200,
            sortable: true,
            filterable: true,
            filter: {
                filterBy: 'city',
                type: 'LIST',
                allowedTypes: [ft.EQ, ft.LIST]
            }
        },
        {
            accessor: 'regCenter',
            title: 'Рег. центр',
            minWidth: 100,
            maxWidth: 300,
            sortable: true,
            filterable: true,
            filter: {
                filterBy: 'regCenter',
                type: 'LIST',
                allowedTypes: [ft.STARTING, ft.ENDING, ft.INCLUDING, ft.EQ, ft.LIST]
            },
            editable: true,
            editor: RegCenterEditor
        },
        {
            accessor: 'office',
            title: 'Офис',
            minWidth: 100,
            maxWidth: 300,
            sortable: true,
            filterable: true,
            filter: {
                filterBy: 'office',
                type: 'LIST',
                allowedTypes: [ft.STARTING, ft.ENDING, ft.INCLUDING, ft.EQ, ft.LIST]
            }
        },
        {
            accessor: 'address',
            title: 'Адрес',
            minWidth: 100,
            maxWidth: 500,
            sortable: true,
            filterable: true,
            filter: {
                filterBy: 'address',
                type: ft.INCLUDING,
                allowedTypes: [ft.STARTING, ft.ENDING, ft.INCLUDING]
            }
        },
    ]
}
