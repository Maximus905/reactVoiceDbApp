import React from "react";
import Table from "@rsb/simple-table"
import {config} from "./tableConfig";

const UnregisteredPhonesTable = ({extFilter}) => {
    return <Table {...config} extFilters={extFilter}  />
}
export default UnregisteredPhonesTable