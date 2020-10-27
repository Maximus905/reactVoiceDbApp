import {Redirect} from 'react-router-dom'
import {logout} from "../LoginPage/helpers";

const LogoutPage = async ({clearTimerSchedule, setTokenExpDate}) => {
  try {
    const res = await logout()
    if (res) {
      setTokenExpDate(null)
      clearTimerSchedule()
    }
  } catch (e) {

  }

}

export default LogoutPage