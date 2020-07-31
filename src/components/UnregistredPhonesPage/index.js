/**@jsx jsx*/
import {jsx, css} from '@emotion/core'
import {useState} from 'react'
import OfficeList from "./components/OfficeList";
import {Button, Input} from 'reactstrap'
import {OFFICE_LIST_URL} from "../../constants";
import {DEFAULT_AGE_OF_LAST_UPDATE_H} from "./constants/times";
import UnregisteredPhonesTable from "./components/UnregisteredPhonesTable";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSync} from "@fortawesome/free-solid-svg-icons";

const UnregisteredPhonesPage = (props) => {
    const [extFilter, setExtFilter] = useState({lotusId: null, age: DEFAULT_AGE_OF_LAST_UPDATE_H})
    const [loading, setLoading] = useState(false)
    const [age, setAge] = useState(DEFAULT_AGE_OF_LAST_UPDATE_H)
    const api = {}
    const onChangeSelected = ({accessor, value}) => {
        setExtFilter({lotusId: value[0], age: age})
    }
    const onReloadHandler = () => setExtFilter({...extFilter, age: age})
    return (
        <div css={css`display: flex; flex-direction: column; height: 100%; padding-bottom: 1rem`}>
            <div className="row">
                <div className="col pt-1 pb-1 d-flex">
                    <div css={css`max-width: 600px; flex-grow: 1`}>
                        <OfficeList onChangeSelected={onChangeSelected} buttonTitle={extFilter.office} dataUrl={OFFICE_LIST_URL} accessor="office" disabled={loading} />
                    </div>
                    <Button className="ml-2" css={css`background-color: rgb(62,148,224)`} onClick={onReloadHandler} disabled={loading}><FontAwesomeIcon icon={faSync}/></Button>
                    <div className="ml-2 p-2" css={css`background-color: rgb(62,148,224); color: white; border-radius: 0.25rem`}>Last update (hours ago) ></div>
                    <div className="ml-2" css={css`width: 100px`}><Input type="number" value={age} onChange={e => setAge(e.target.value)} readOnly={loading} /></div>
                </div>
            </div>
            <div css={css`flex-grow: 1; min-height: 0; height: 100%`}>
                <UnregisteredPhonesTable extFilter={extFilter} setLoading={setLoading} api={api} />
            </div>
        </div>

    )
}
export default UnregisteredPhonesPage