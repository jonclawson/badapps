export class StateService {
  state: string;
  constructor () {
    this.state = history.state || location.pathname;
  }
  history = window.history;
  current: string;
  go (state: string) {
    this.current = state;
    this.history.pushState(state, state, state);
  }
}
