/**@jsx jsx*/
import {jsx, css} from '@emotion/core'
import DropdownList from "@maximus905/dropdown-list";
import {Button} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown} from "@fortawesome/free-solid-svg-icons";
import PropTypes from 'prop-types'
import axios from 'axios'
import {GET_CSS_LIST} from "../../../../constants";

const loader = async ({url, accessor, filters, sorting, dataFieldName, labelFieldName, valueFieldName}) => {
  try {
    const res = await axios.get(url, {
      params: {cucm: filters}
    })
    if (!Array.isArray(res.data)) {
      console.log('invalid data from server: ', res)
      throw new Error('Error fetching data from server')
    }
    return {[dataFieldName]: res.data}
  } catch (e) {
    alert(e.toString())
    return {[dataFieldName]: []}
  }
}

const CssList = ({onChangeSelected, buttonTitle, dataUrl, accessor, disabled, cucmName}) => {


  const btnStyle = css`
    min-width: 250px;
    max-width: 250px;
    color: white;
    background-color: rgb(62,148,224);
      &:hover {
        background-color: rgb(35,89,130);
      };
`
  const DDButton = ({buttonRef, checkedItemsValue, checkedItemsLabel, disabled}) => (
    <Button className="d-flex justify-content-between w-100" innerRef={buttonRef} css={btnStyle} disabled={disabled}>
      <div title={checkedItemsLabel.join(',')}>{(checkedItemsLabel.join(','))  || 'Выберите CSS'}</div>
      <div className="pl-1"><FontAwesomeIcon icon={faAngleDown}/></div>
    </Button>
  )
  return <DropdownList
    accessor={accessor} dataUrl={GET_CSS_LIST} buttonContainerWidth="100%"
    buttonIcon={DDButton} maxHeight={400} widthMenuLikeButton
    minWidth={200} maxWidth={600}
    onChangeSelected={onChangeSelected} onOpen={()=>{}} onClose={()=>{}}
    closeAfterSelect disabled={disabled} dataLoader={loader} filters={cucmName} />
}

CssList.propTypes = {
  ...DropdownList.propTypes,
  buttonTitle: PropTypes.string,
  cucmName: PropTypes.string
}

export default CssList