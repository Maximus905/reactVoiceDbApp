/**@jsx jsx*/
import {jsx} from "@emotion/core"
import Table from "@maximus905/simple-table";
import config from './tableConfig'

const CucmRoutesTable = ({extFilter, api, setLoading}) => (
  <Table {...config} extFilters={extFilter} onBeforeRequestData={() => setLoading(true)} onAfterRequestData={() => setLoading(false)} />
)

export default CucmRoutesTable