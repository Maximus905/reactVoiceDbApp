/**@jsx jsx*/
import {jsx, css} from '@emotion/core'
import moment from 'moment'

const baseCss = css`
  word-wrap: break-word;
`
const selectedCss = css`
  ${baseCss};
  border: 2px solid skyblue !important;
`

export const DateTimeCell = (
    {
        accessor,rowData, rowId, width, tBodyHeight, selected,
        editMode,
        editor: Editor,
        onClickHandler,
        onDoubleClickHandler,
        refCellEditor,
        subscribeOnOutsideClick, unsubscribeFromOutsideClick,
        setIsSaving, stopEdit, saveChangesLocally, saveChangesUrl, tableDataUrl, filterDataUrl,
        errorFieldName
    }
) => {
    const dt = moment(rowData[accessor])
    return <td onClick={onClickHandler} onDoubleClick={onDoubleClickHandler} css={selected ? selectedCss : baseCss}>
        {dt.isValid() ? dt.format("YYYY-MM-DD HH:mm") : ''}
    </td>
}


