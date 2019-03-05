const Rental = require('./models/rental');
const fakeDbData = require('./data.json');

class FakeDb {
    constructor() {
        this.rentals = fakeDbData.rentals;
        this.users = fakeDbData.users;
    }

    async cleanDb() {
        await Rental.remove({})
    }

    pushRentalsToDb() {
        this.rentals.forEach(rental => {
            const newRental = new Rental(rental);

            newRental.save()
        })
    }

    seedDb() {
        this.cleanDb()
        this.pushRentalsToDb()
    }
}

module.exports = FakeDb