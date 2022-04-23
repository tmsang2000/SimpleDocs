import { add } from "lodash";

export class Printer {
    name;
    address;
    star;
    phone;
    mail;
    openAt;
    closeAt;
    price;
    packageHistory;


    constructor({name, address, star, phone, mail, openAt, closeAt, price, packageHistory}){
        this.name = name;
        this.address = address;
        this.star = star;
        this.phone = phone;
        this.mail = mail;
        this.openAt = openAt;
        this.closeAt = closeAt;
        this.packageHistory = packageHistory;
    }
}

export class NearPrinter {
    printer;


    constructor({printer}){
        this.printer = printer;
    }
}

export let printer1 = new Printer({
    name: "Back Khoa",
    address: "268 Ly Thuong Kiet quan 10",
    star: "4.5",
    phone: "092837612",
    mail: "sang.trieuenemy456@hcmut.edu.vn",
    openAt: 1234551,
    closeAt: 1234681,
    price: 3000,
    packageHistory: [],
})

export let printer2 = new Printer({
    name: "Back Khoa",
    address: "268 Ly Thuong Kiet quan 10",
    star: "5",
    phone: "092837612",
    mail: "sang.trieuenemy456@hcmut.edu.vn",
    openAt: 1234551,
    closeAt: 1234681,
    price: 3000,
    packageHistory: [],
})

export let printer3 = new Printer({
    name: "Back Khoa",
    address: "268 Ly Thuong Kiet quan 10",
    star: "3",
    phone: "092837612",
    mail: "sang.trieuenemy456@hcmut.edu.vn",
    openAt: 1234551,
    closeAt: 1234681,
    price: 3000,
    packageHistory: [],
})

export let printer4 = new Printer({
    name: "Back Khoa",
    address: "268 Ly Thuong Kiet quan 10",
    star: "2",
    phone: "092837612",
    mail: "sang.trieuenemy456@hcmut.edu.vn",
    openAt: 1234551,
    closeAt: 1234681,
    price: 3000,
    packageHistory: [],
})

export let printer5 = new Printer({
    name: "Back Khoa",
    address: "268 Ly Thuong Kiet quan 10",
    star: "1",
    phone: "092837612",
    mail: "sang.trieuenemy456@hcmut.edu.vn",
    openAt: 1234551,
    closeAt: 1234681,
    price: 3000,
    packageHistory: [],
})

export let listPrinter = new NearPrinter({
    printer: [printer1, printer2, printer3, printer4, printer5]
})

export class Document {
    printer;
    cost;
    type;
    pdf;
    both_side;
    numberOfPage;
    note;
    deadline;
    paperSize;
    paperColor;
    status;
    rating;

    constructor({printer, cost, type, pdf, both_side, numberOfPage, note, deadline, paperSize, paperColor, status, rating}){
        this.printer = printer;
        this.cost = cost;
        this.type = type;
        this.pdf = pdf;
        this.both_side = both_side;
        this.numberOfPage = numberOfPage;
        this.note = note;
        this.deadline = deadline;
        this.paperSize = paperSize;
        this.paperColor = paperColor;
        this.status = status;
        this.rating = rating;
    }
}

export class Status {
    printing;
    printed;
    finished;

    constructor({printing, printed, finished}){
        this.printing = printing;
        this.printed = printed;
        this.finished = finished;
    }
}

export let status1 = new Status({
    printing: true,
    printed: true,
    finished: false,
});

export let status2 = new Status({
    printing: true,
    printed: false,
    finished: false,
});

export let status3 = new Status({
    printing: false,
    printed: false,
    finished: false,
});

export let status4 = new Status({
    printing: true,
    printed: false,
    finished: false,
});

export let status5 = new Status({
    printing: true,
    printed: true,
    finished: false,
});

export let document1 = new Document({
    printer: printer1, 
    cost: 2000,
    type:  "document", 
    pdf: "http...", 
    both_side: true, 
    numberOfPage: 20, 
    note: "Print fast", 
    deadline: 1921211, 
    paperSize: "A4",
    paperColor: "red", 
    status: status1, 
    rating: 9,
});

export let document2 = new Document({
    printer: printer1, 
    cost: 5000, 
    type: "document", 
    pdf: "http...", 
    both_side: false, 
    numberOfPage: 20, 
    note: "Print fast", 
    deadline: 1921253, 
    paperSize: "A4", 
    paperColor: "red", 
    status: status2, 
    rating: 20,
});

export let document3 = new Document({
    printer: printer1, 
    cost: 3000, 
    type: "document", 
    pdf: "http...", 
    both_side: false, 
    numberOfPage: 20, 
    note: "Print fast", 
    deadline: 1921253, 
    paperSize: "A4", 
    paperColor: "red", 
    status: status3, 
    rating: 20,
});

export let document4 = new Document({
    printer: printer1, 
    cost: 1500, 
    type: "document", 
    pdf: "http...", 
    both_side: false, 
    numberOfPage: 20, 
    note: "Print fast", 
    deadline: 1921253, 
    paperSize: "A4", 
    paperColor: "red", 
    status: status4, 
    rating: 20,
});

export let document5 = new Document({
    printer: printer1, 
    cost: 9000, 
    type: "document", 
    pdf: "http...", 
    both_side: false, 
    numberOfPage: 20, 
    note: "Print fast", 
    deadline: 1921253, 
    paperSize: "A4", 
    paperColor: "red", 
    status: status5, 
    rating: 20,
});

export class User {
    fullName;
    gender;
    address;
    dob;
    identityNumber;
    phone;
    job;
    studentNumber;
    packageHistory;

    constructor({fullName, gender, address, dob, identityNumber, phone, job, packageHistory}){
        this.fullName = fullName;
        this.gender = gender;
        this.address = address;
        this.dob = dob;
        this.identityNumber = identityNumber;
        this.phone = phone;
        this.job = job;
        this.packageHistory = packageHistory;
    }
}

export const user1 = new User({
    fullName: "Trieu Minh Sang",
    gender: "male",
    address: "244 Nguyen Thi Dinh phuong Binh Trung Tay quan 2 Tp. Ho Chi Minh aaa aaaaaa aaaa aaaaaaaaa aaaaaa aaaa aaaaaa",
    dob: 123112, 
    identityNumber: "026074021",
    phone: "0909419497",
    job: "student",
    studentNumber: "1852717",
    packageHistory: [document1, document2, document3, document4, document5]
})