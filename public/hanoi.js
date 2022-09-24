/**
 * CLASS STRUCTURE FOR THE PUZZLE
 * - Made with a number of pegs and discs
 */
class Hanoi {

    // Constructor function for creating the object, given peg and disc counts
    constructor(p, d) {
        this.pegCount = p;
        this.discCount = d;
        this.pegs = [];
        for (let i = 0; i < p; i++) {
            this.pegs[i] = new Peg([]);
        }
        for (let i = d; i >= 1; i--) {
            this.pegs[0].addDisc(i);
        }
        this.moving = null;
    }


    // Method to move the top disc from one peg to another peg
    move(donor, target) {
        if (donor == target) {
            console.log("Put a disc back where it already was!");
            return;
        }
        let discVal = this.pegs[donor].lookAtTopDisc();
        if (discVal == undefined) {
            console.log("There are no discs to take!");
            return;
        }
        let LZ = this.pegs[target].lookAtTopDisc();
        if (LZ != undefined) {
            if (discVal > LZ) {
                console.log("Cannot place big disc on small disc!");
                return;
            }
        }
        this.pegs[target].addDisc(this.pegs[donor].takeTopDisc());
    }


    // Method to handle a click location
    clicked(spot) {
        if (this.moving == null) {
            this.moving = spot;
        } else {
            this.move(this.moving, spot);
            this.moving = null;
        }
    }

}





/**
 * CLASS STRUCTURE FOR A PEG
 * - Made with initial discs
 */
class Peg {

    // Object constructor given initial disc numebrs
    constructor(initDiscs) {
        this.discs = [...initDiscs];
    }


    // Method to get top most disc number
    lookAtTopDisc() {
        return this.discs[this.discs.length-1];
    }


    // Method to remove top disc
    takeTopDisc() {
        return this.discs.pop();
    }


    // Method to add a disc to the top
    addDisc(newDisc) {
        this.discs.push(newDisc);
    }

}