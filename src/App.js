import React, {useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import TopNavBar from "./components/TopNavBar"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {Page, PageHeader, PageMain, PageFooter} from "./components/Page";
import RegCentersMapTable from "./components/RegCentersMapTable";
import {DICT_REG_CENTERS_MAPPING} from "./constants/urls";


function App() {
  return (
      <Router>
        <Page>
            <PageHeader>
                <TopNavBar />
            </PageHeader>
            <PageMain>
                <Switch>
                    <Route path={DICT_REG_CENTERS_MAPPING} exact>
                        <RegCentersMapTable/>
                    </Route>
                </Switch>
            </PageMain>
            <PageFooter />
        </Page>
      </Router>
  );
}

export default App;
