/**@jsx jsx*/
import {jsx, css} from "@emotion/core";
import bg from './page_bg.jpg'

const Page = ({children}) => {
    const style = css`
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #fff url(${bg});
`
    return (<div css={style}>{children}</div>)
}

const PageHeader = ({children}) => {
    return (<header>{children}</header>)
}

const PageMain = ({children}) => {
    const style = css`
  min-height: 0;
  height: 100%;
  flex-grow: 1;
`
    return (<main css={style} className="container-fluid">{children}</main>)
}

const PageFooter = ({children}) => {
    return (<footer>{children}</footer>)
}

export {Page, PageHeader, PageMain, PageFooter}
