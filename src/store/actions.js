import {SHOWLOADING, HIDELOADING} from './types'
const actions = {
  showLoad: ({commit}) => {
    commit(SHOWLOADING)
  },
  hideLoad: ({commit}) => {
    commit(HIDELOADING)
  }
}
export default actions
