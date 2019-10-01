class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        this.config = config;
        this.state = config.initial;
        this.history = [this.state];
        this.position = 0;
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (Object.keys(this.config.states).includes(state)) {
            this.state = state;
            this.history[this.position + 1] = this.state;
            this.position++;
        } else {
            throw new Error("Error!!!");
        }

    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if (Object.keys(this.config.states[this.getState()].transitions).includes(event)) {
            this.state = this.config.states[this.getState()].transitions[event];
            this.history[this.position + 1] = this.state;
            this.position++;
        } else {
            throw new Error("Error!!!");
        }

    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.state = this.config.initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        let arr = Object.keys(this.config.states);
        let states = [];
        if (event == undefined) {
            return arr;
        }

        arr.forEach((value) => {
            if (Object.keys(this.config.states[value].transitions).includes(event)) {
                states.push(value);
            }
        });

        return states;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.position === 0) {
            return false;
        }
        this.state = this.history[this.position - 1];
        this.position--;
        return true;

    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.position >= this.history.length - 1 || this.position < 0) {
            return false;
        }
        this.state = this.history[this.position + 1];
        this.position++;
        return true;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.history = [];
        this.position = 0;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
