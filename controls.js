class Controls{
    constructor(type) {
        this.forward = false;
        this.left = false;
        this.right = false;
        this.reverse = false;

        switch (type) {
            case "KEYS":
                this.#addKeyboardListeners();
                break;
            case "DUMMY":
                this.forward = true;
                break;
        }
    }
    #addKeyboardListeners() {
        document.onkeydown=(event)=>{
            switch (event.key) {
                case "a":
                case "A":
                    this.left = true;
                    break;
                case "d":
                case "D":
                    this.right = true;
                    break;
                case "w":
                case "W":
                    this.forward = true;
                    break;
                case "s":
                case "S":
                    this.reverse = true;
                    break;
            }
            // console.table(this); //debug statement
        }

        document.onkeyup=(event)=>{
            switch (event.key) {
                case "a":
                case "A":
                    this.left = false;
                    break;
                case "d":
                case "D":
                    this.right = false;
                    break;
                case "w":
                case "W":
                    this.forward = false;
                    break;
                case "s":
                case "S":
                    this.reverse = false;
                    break;
            }
            // console.table(this); //debug statement
        }
    }
}