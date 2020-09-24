type aggressionType = "Aggressive" | "Not Aggressive"

interface pet{
    type: string;
    availableNum : number;
}

interface petSpecific{
    type: string;
    breed: string;
    history : aggressionType;
}

//Variable to store array of pettypes
type enquiryNames = Array<string>;

class availability{
    avpetSpecific : Array<petSpecific>
    avpet : Array<pet>
    constructor(avpetSpecific?: Array<petSpecific>){
        if(avpetSpecific){
            this.avpetSpecific = avpetSpecific;
            this.avpet = [];
            for(let i=0; i<avpetSpecific.length; i++){
                let j :number;
                for(j = 0; j < this.avpet.length; j++){
                    if( this.avpet[j].type === avpetSpecific[i].type){
                        this.avpet[j].availableNum++
                        break;
                    }
                }
                if( j === this.avpet.length){
                    this.avpet.push({type : avpetSpecific[i].type , availableNum : 1});
                }
            }
        }
        else{
            this.avpetSpecific = [];
            this.avpet =[];
        }
    }

    insert(petDet : petSpecific) : void{
        let i : number;
        for(i = 0; i < this.avpet.length; i++){
            if( this.avpet[i].type === petDet.type){
                this.avpet[i].availableNum++
                break;
            }
        }
        if(i === this.avpet.length){
            this.avpet.push({type : petDet.type , availableNum : 1});
        }
        this.avpetSpecific.push(petDet);
    }

    mapAvailabilityToRequest(req : request) : void{
        for(let i=0; i<this.avpet.length; i++){
            let countOfReq =0; // Count of requests containing current pet type
            for(let j = 0 ; j<req.enquiries.length ; j++){
                if(req.enquiries[j].includes(this.avpet[i].type))
                    countOfReq++;
            }
            console.log("No.of requests containing a " + this.avpet[i].type + " are " + countOfReq);
        }
    }
}

class request{
    enquiries : Array<enquiryNames>

    constructor(){
        this.enquiries = [];
    } 
    
    insert(enquiry : enquiryNames) : void{
        this.enquiries.push(enquiry);
    }

    findStatus(avail : availability) : void{
        if(this.enquiries){
            for(let i = 0 ; i < 5 && i < this.enquiries.length ; i++ ){
                console.log("Status of enquiry "+ (i+1) + ":")
                for(let j = 0 ; j<this.enquiries[i].length ; j++){
                    let k: number;
                    for(k=0 ; k<avail.avpet.length; k++){
                        if(this.enquiries[i][j] === avail.avpet[k].type){
                            console.log("Available number of " + this.enquiries[i][j] + "s is " + avail.avpet[k].availableNum);
                            break;
                        }
                    }
                    if(k === avail.avpet.length){
                        console.log("Available number of " + this.enquiries[i][j] + "s is 0");
                    }
                }
            }
        }
        else{
            console.log("No enquiries present yet");
        }
    }

}

let avail1 = new availability([{type:'Cat',breed: 'Persian', history: "Not Aggressive"},{type:'Dog',breed: 'German Shepherd', history: "Aggressive"}, {type:'Dog',breed: 'Rotweiller', history: "Aggressive"}, {type:'Parrot',breed: 'African Macow', history: "Not Aggressive"}]);
//let avail1 = new availability();
avail1.insert({type:'Cat',breed: 'British Shorthair', history: "Aggressive"});
avail1.insert({type:'Dog',breed: 'Pitbull', history: "Aggressive"});
avail1.insert({type:'Parrot',breed: 'Ashenfallow Cockatiel', history: "Not Aggressive"});
avail1.insert({type:'Cat',breed: 'Siamese cat', history: "Not Aggressive"});
avail1.insert({type:'Squirrel',breed: 'American red squirrel', history: "Not Aggressive"});

let req1 = new request();
req1.insert(["Dog" , "Cat"])
req1.insert(["Cat" , "Parrot"])
req1.insert(["Parrot" , "Cat" , "Dog"])
req1.insert(["Squirrel" , "Monitor Lizard"])
req1.insert(["Python" , "Crocodile"])
req1.insert(["Elephant", "Dog"])

req1.findStatus(avail1);

avail1.mapAvailabilityToRequest(req1);