import {GET_CUCM_ROUTES} from "../../../../constants";
import dataLoader from "./dataLoader";

const config = {
  tableDataLoader: dataLoader,
  // filterDataLoader: fetchFilterList,
  tableDataUrl: GET_CUCM_ROUTES,
  filterDataUrl: '',
  showGlobalSearch: false,
  columns: [
    {
      accessor: 'number',
      title: 'number',
      minWidth: 200,
      maxWidth: 200,
      sortable: false,
      filterable: false,
    },
    {
      accessor: 'cucm',
      title: 'cucm',
      minWidth: 150,
      maxWidth: 150,
      sortable: false,
      filterable: false,
    },
    {
      accessor: 'np_pattern',
      title: 'np_pattern',
      minWidth: 200,
      maxWidth: 200,
      sortable: false,
      filterable: false,
    },
    {
      accessor: 'gateway',
      title: 'gateway',
      minWidth: 250,
      maxWidth: 250,
      sortable: false,
      filterable: false,
    },
    {
      accessor: 'description',
      title: 'description',
      minWidth: 250,
      maxWidth: 350,
      sortable: false,
      filterable: false,
    },
    {
      accessor: 'target',
      title: 'target',
      minWidth: 150,
      maxWidth: 350,
      sortable: false,
      filterable: false,
    },
  ]
}

export default config