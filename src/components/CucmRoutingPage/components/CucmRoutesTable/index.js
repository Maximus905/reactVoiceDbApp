/**@jsx jsx*/
import {jsx} from "@emotion/core"
import {GET_CUCM_ROUTES} from "../../../../constants";
import Table from "@rsb/simple-table";
import config from './tableConfig'
import React from "react";

const CucmRoutesTable = ({extFilter, api, setLoading}) => (
  <Table {...config} extFilters={extFilter} onBeforeRequestData={() => setLoading(true)} onAfterRequestData={() => setLoading(false)} />
)

export default CucmRoutesTable