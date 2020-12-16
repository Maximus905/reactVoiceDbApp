import React from "react";
import Table from "@maximus905/simple-table"
import {config} from "./tableConfig";

const UnregisteredPhonesTable = ({extFilter, api, setLoading}) => {
    return <Table {...config} extFilters={extFilter} api={api} onBeforeRequestData={() => setLoading(true)} onAfterRequestData={() => setLoading(false)} />
}
export default UnregisteredPhonesTable