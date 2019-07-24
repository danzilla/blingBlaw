/*
 * Active pages states
 */
const PageStates = {
    authPage: {
        firstRun: "HiHIHIH",
        login: "",
        register: ""
    },
    dashboadPage: {
        users: "",
        fannyPack: ""
    },
    fannyPackPage: {
        fannyPackAccount: "",
        fannyPackCategory: "",
        fannyPackType: "",
    }
}

// activeFannyPack 
const ActiveFannyPack = () => {
    this.setState(prevState => ({
        PageStates: {
            ...prevState.PageStates, // copy all other key-value
            authPage: { // specific object
                ...prevState.PageStates.authPage, // copy all pizza key-value pairs
                firstRun: "truetruetruetruetruetruetrue", // update value of specific key
                login: "falsefalsefalsefalsefalsefalsefalse"
            }
        }
    }))
}

const ActiveFannyPack1 = () => {
      this.setState({
          PageStates: {
              ...this.state.PageStates,
            authPage: {
                ...this.state.PageStates.authPage,
                firstRun: "truetruetruetruetruetruetrue",
                login: "falsefalsefalsefalsefalsefalsefalse"
            }
          }
      })
  }
export {
    PageStates
};





