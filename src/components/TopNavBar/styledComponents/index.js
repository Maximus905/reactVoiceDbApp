/**@jsx jsx*/
import styled from "@emotion/styled";
import PropTypes from 'prop-types'
import {NavLink as NavLinkRR} from "react-router-dom";
import {
    DropdownItem as DropdownItemBs,
    DropdownMenu as DropdownMenuBs,
    NavItem as NavItemBs, NavLink as NavLinkBs,
    UncontrolledDropdown,
    DropdownToggle as DropdownToggleBs
} from "reactstrap";
import {css, jsx} from "@emotion/core";

const StyledNavLink = styled(NavLinkRR)`
      &.active {
        font-weight: bold;
      }
    `
export const NavItem = styled(NavItemBs)`
  display: flex;
  align-items: stretch;
  &.active {
    background-color: #e7e7e7;
  }
`
export const Dropdown = styled(UncontrolledDropdown)`
  display: flex;
  align-items: stretch;
`
export const DropdownMenu = styled(DropdownMenuBs)`
  padding: 5px 0;
  & a {
    padding: 3px 20px !important;
    &:hover {
      background-color: #f5f5f5;
    }
  }
`
export const DropdownItem = styled(DropdownItemBs)`
  padding: 0;
  font-size: 15px;
  &:hover {
  background-color: #f5f5f5;
  }
`
export const NavLink = props => {
    const {external, to, isActive, ...rest} = props
    const style = css`
      display: flex;
      align-items: center;
      color: #777 !important;
      padding: 0;
      &:hover {
        color: #333 !important;
      }
      &.active {
        color: #333 !important;
        background-color: #e7e7e7;
        font-weight: normal;
      }
    `
    return external
        ? <NavLinkBs css={style} href={to} {...rest} />
        : <NavLinkBs css={style} tag={StyledNavLink} exact to={to} isActive={isActive} {...rest} />
}
NavLink.propTypes = {
    isActive: PropTypes.func,
    external: PropTypes.bool,
    to: PropTypes.string
}
NavLink.defaultProps = {
    isActive: (match, location) => match,
    external: false
}
export const DropdownToggle = styled(DropdownToggleBs)`
  display: flex;
  align-items: center;
  &.active {
    background-color: #e7e7e7;
  }
`
