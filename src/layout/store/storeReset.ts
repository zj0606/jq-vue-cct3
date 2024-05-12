import _ from 'lodash'
export default function storeReset({ store }) {
  const initialState = _.cloneDeep(store.$state);
  store.$reset = () => store.$patch(_.cloneDeep(initialState));
}