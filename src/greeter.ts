
export class Greeter {
    template = `
    <a data-click="profile()">hello {name}</a>
    <login></login>
    <register></register>
    `
    name = 'Tom'
    constructor() {
    }

    profile () {
      alert(this.name)
    }
}
