/**@jsx jsx*/
import {jsx, css} from '@emotion/core'
import {useState} from 'react'
import OfficeList from "./components/OfficeList";
import {OFFICE_LIST_URL} from "../../constants/urls";
import UnregisteredPhonesTable from "./components/UnregisteredPhonesTable";

const UnregisteredPhonesPage = (props) => {
    const [selected, setSelected] = useState([])
    const onChangeSelected = ({accessor, value}) => {
        setSelected(value)
    }
    return (
        <div css={css`display: flex; flex-direction: column; height: 100%; padding-bottom: 1rem`}>
            <div className="row">
                <div className="col-6 pt-1 pb-1">
                    <OfficeList onChangeSelected={onChangeSelected} buttonTitle={selected.join(', ')} dataUrl={OFFICE_LIST_URL} accessor="office"  />
                </div>
            </div>
            <div css={css`flex-grow: 1`}>
                <UnregisteredPhonesTable extFilter={selected[0]}/>
            </div>
        </div>

    )
}
export default UnregisteredPhonesPage