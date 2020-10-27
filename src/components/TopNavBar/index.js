/**@jsx jsx*/
import {jsx, css} from '@emotion/core'
import {
    Navbar,
    NavbarBrand,
    Nav,
} from 'reactstrap';
import {NavLink, NavItem, Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "./styledComponents";
import logo from './logo_brs_small.png'
import {
  LOCATIONS, DEVICES,
  PHONES_INFO_URL, PHONES_FIO_URL, PHONES_REDIRECTED_PHONES_URL,
  NETWORKS_IPAM, REPORTS,
  PHONE_REPORTS_BY_MODELS, PHONE_REPORTS_BY_CLUSTERS, PHONE_REPORTS_BY_NOT_USED, PHONE_REPORTS_BY_AGENT_LICENSES,
  DICT_CITIES, DICT_DEVICES, DICT_HW_LOGS, DICT_NETWORKS, DICT_OFFICE_STATUSES, DICT_PHONE_LOGS, DICT_PORT_TYPES,
  DICT_REGIONS, DICT_VRFS, DICT_REG_CENTERS_MAPPING, UNREGISTERED_PHONES, CUCM_ROUTES, TEST_TOOLS
} from "../../constants";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faUserCircle} from "@fortawesome/free-solid-svg-icons"
import {clearToken, logout, isLoggedIn} from "../LoginPageMU/helpers";


const TopNavBar = ({clearTimerSchedule, setTokenExpDate}) => {

    const onClickLogout = async (e) => {
        e.preventDefault()
        if (!isLoggedIn()) return

        await logout()
        clearToken()
        clearTimerSchedule()
        setTokenExpDate(false)
    }

    return (
            <Navbar color="light" light css={css`padding: 0; font-size: 15px`} expand="xs">
                <div className="container-fluid align-items-stretch" css={css`padding-left: 15px !important; padding-right: 15px !important;`}>
                    <NavbarBrand href="/"><img src={logo} alt="BRS" css={css`height: 40px`} /></NavbarBrand>
                    <Nav className="mr-auto" navbar>
                        <NavLink to={LOCATIONS} external>Офисы</NavLink>
                        <NavLink  to={DEVICES} external >Оборудование</NavLink>
                        <Dropdown nav inNavbar>
                            <DropdownToggle nav caret className={"toggle"}>Phones</DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem><NavLink to={PHONES_INFO_URL} external>Телефоны Инфо</NavLink></DropdownItem>
                                <DropdownItem><NavLink to={PHONES_FIO_URL} external>Телефоны по ФИО</NavLink></DropdownItem>
                                <DropdownItem><NavLink to={PHONES_REDIRECTED_PHONES_URL} external>Телефоны с переадресацией</NavLink></DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown nav inNavbar>
                            <DropdownToggle nav caret>IP planing</DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem><NavLink to={NETWORKS_IPAM} external>IPAM</NavLink></DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <NavItem><NavLink to={REPORTS} external>Reports</NavLink></NavItem>
                        <Dropdown nav inNavbar>
                            <DropdownToggle nav caret>Phone reports</DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem><NavLink to={PHONE_REPORTS_BY_MODELS} external>по моделям</NavLink></DropdownItem>
                                <DropdownItem><NavLink to={PHONE_REPORTS_BY_CLUSTERS} external>по кластерам</NavLink></DropdownItem>
                                <DropdownItem><NavLink to={PHONE_REPORTS_BY_NOT_USED} external>по неиспользуемым</NavLink></DropdownItem>
                                <DropdownItem><NavLink to={PHONE_REPORTS_BY_AGENT_LICENSES} external>по Agent Licenses</NavLink></DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                         <Dropdown nav inNavbar>
                            <DropdownToggle nav caret>Tools</DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem><NavLink to={UNREGISTERED_PHONES}>Поиск незарегистрированных телефонов</NavLink></DropdownItem>
                                <DropdownItem><NavLink to={CUCM_ROUTES}>CUCM маршрутизация</NavLink></DropdownItem>
                                <DropdownItem><NavLink to={TEST_TOOLS}>Testing CORS requests</NavLink></DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </Nav>
                    <Nav navbar>
                        <Dropdown nav inNavbar>
                            <DropdownToggle nav caret>Справочники</DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem><NavLink to={DICT_REG_CENTERS_MAPPING}>Рег.центры(mapping)</NavLink></DropdownItem>
                                <DropdownItem><NavLink to={DICT_REGIONS} external>Регионы</NavLink></DropdownItem>
                                <DropdownItem><NavLink to={DICT_CITIES} external>Города</NavLink></DropdownItem>
                                <DropdownItem><NavLink to={DICT_OFFICE_STATUSES} external>Статусы офисов</NavLink></DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem><NavLink to={DICT_DEVICES} external>Оборудование</NavLink></DropdownItem>
                                <DropdownItem ><NavLink to={DICT_PORT_TYPES} external>Типы портов</NavLink></DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem><NavLink to={DICT_VRFS} external>VRF</NavLink></DropdownItem>
                                <DropdownItem><NavLink to={DICT_NETWORKS} external>Networks(Table)</NavLink></DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem><NavLink to={DICT_HW_LOGS} external>Логи Hardware</NavLink></DropdownItem>
                                <DropdownItem><NavLink to={DICT_PHONE_LOGS} external>Логи Phones</NavLink></DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown nav inNavbar>
                            <DropdownToggle nav><FontAwesomeIcon icon={faUserCircle} size='2x' /></DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem><NavLink to={'#'} onClick={onClickLogout} >Logout</NavLink></DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </Nav>
                </div>
            </Navbar>

    );
}
export default TopNavBar