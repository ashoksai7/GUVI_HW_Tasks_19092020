var availability = /** @class */ (function () {
    function availability(avpetSpecific) {
        if (avpetSpecific) {
            this.avpetSpecific = avpetSpecific;
            this.avpet = [];
            for (var i = 0; i < avpetSpecific.length; i++) {
                var j = void 0;
                for (j = 0; j < this.avpet.length; j++) {
                    if (this.avpet[j].type === avpetSpecific[i].type) {
                        this.avpet[j].availableNum++;
                        break;
                    }
                }
                if (j === this.avpet.length) {
                    this.avpet.push({ type: avpetSpecific[i].type, availableNum: 1 });
                }
            }
        }
        else {
            this.avpetSpecific = [];
            this.avpet = [];
        }
    }
    availability.prototype.insert = function (petDet) {
        var i;
        for (i = 0; i < this.avpet.length; i++) {
            if (this.avpet[i].type === petDet.type) {
                this.avpet[i].availableNum++;
                break;
            }
        }
        if (i === this.avpet.length) {
            this.avpet.push({ type: petDet.type, availableNum: 1 });
        }
        this.avpetSpecific.push(petDet);
    };
    availability.prototype.mapAvailabilityToRequest = function (req) {
        for (var i = 0; i < this.avpet.length; i++) {
            var countOfReq = 0; // Count of requests containing current pet type
            for (var j = 0; j < req.enquiries.length; j++) {
                if (req.enquiries[j].includes(this.avpet[i].type))
                    countOfReq++;
            }
            console.log("No.of requests containing a " + this.avpet[i].type + " are " + countOfReq);
        }
    };
    return availability;
}());
var request = /** @class */ (function () {
    function request() {
        this.enquiries = [];
    }
    request.prototype.insert = function (enquiry) {
        this.enquiries.push(enquiry);
    };
    request.prototype.findStatus = function (avail) {
        if (this.enquiries) {
            for (var i = 0; i < 5 && i < this.enquiries.length; i++) {
                console.log("Status of enquiry " + (i + 1) + ":");
                for (var j = 0; j < this.enquiries[i].length; j++) {
                    var k = void 0;
                    for (k = 0; k < avail.avpet.length; k++) {
                        if (this.enquiries[i][j] === avail.avpet[k].type) {
                            console.log("Available number of " + this.enquiries[i][j] + "s is " + avail.avpet[k].availableNum);
                            break;
                        }
                    }
                    if (k === avail.avpet.length) {
                        console.log("Available number of " + this.enquiries[i][j] + "s is 0");
                    }
                }
            }
        }
        else {
            console.log("No enquiries present yet");
        }
    };
    return request;
}());
var avail1 = new availability([{ type: 'Cat', breed: 'Persian', history: "Not Aggressive" }, { type: 'Dog', breed: 'German Shepherd', history: "Aggressive" }, { type: 'Dog', breed: 'Rotweiller', history: "Aggressive" }, { type: 'Parrot', breed: 'African Macow', history: "Not Aggressive" }]);
//let avail1 = new availability();
avail1.insert({ type: 'Cat', breed: 'British Shorthair', history: "Aggressive" });
avail1.insert({ type: 'Dog', breed: 'Pitbull', history: "Aggressive" });
avail1.insert({ type: 'Parrot', breed: 'Ashenfallow Cockatiel', history: "Not Aggressive" });
avail1.insert({ type: 'Cat', breed: 'Siamese cat', history: "Not Aggressive" });
avail1.insert({ type: 'Squirrel', breed: 'American red squirrel', history: "Not Aggressive" });
var req1 = new request();
req1.insert(["Dog", "Cat"]);
req1.insert(["Cat", "Parrot"]);
req1.insert(["Parrot", "Cat", "Dog"]);
req1.insert(["Squirrel", "Monitor Lizard"]);
req1.insert(["Python", "Crocodile"]);
req1.insert(["Elephant", "Dog"]);
req1.findStatus(avail1);
avail1.mapAvailabilityToRequest(req1);
