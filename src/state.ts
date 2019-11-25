export class StateService {

  constructor () {}
  history = window.history;
  current: string
  go (state: string) {
    this.current = state
    this.history.pushState(state, state, state);
  }
}
