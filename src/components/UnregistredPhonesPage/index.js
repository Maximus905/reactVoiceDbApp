/**@jsx jsx*/
import {jsx, css} from '@emotion/core'
import {useState} from 'react'
import OfficeList from "./components/OfficeList";
import {Button} from 'reactstrap'
import {OFFICE_LIST_URL} from "../../constants/urls";
import UnregisteredPhonesTable from "./components/UnregisteredPhonesTable";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSync} from "@fortawesome/free-solid-svg-icons";

const UnregisteredPhonesPage = (props) => {
    const [selected, setSelected] = useState([])
    const [loading, setLoading] = useState(false)
    const api = {}
    const onChangeSelected = ({accessor, value}) => {
        setSelected(value)
    }
    return (
        <div css={css`display: flex; flex-direction: column; height: 100%; padding-bottom: 1rem`}>
            <div className="row">
                <div className="col-6 pt-1 pb-1 d-flex">
                    <div css={css`max-width: 600px; flex-grow: 1`}>
                        <OfficeList onChangeSelected={onChangeSelected} buttonTitle={selected.join(', ')} dataUrl={OFFICE_LIST_URL} accessor="office" disabled={loading} />
                    </div>
                    <Button className="ml-2" css={css`background-color: rgb(62,148,224)`} onClick={() => api.reload()} disabled={loading}><FontAwesomeIcon icon={faSync}/></Button>
                </div>
            </div>
            <div css={css`flex-grow: 1; min-height: 0; height: 100%`}>
                <UnregisteredPhonesTable extFilter={selected[0]} setLoading={setLoading} api={api} />
            </div>
        </div>

    )
}
export default UnregisteredPhonesPage