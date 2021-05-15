const mongoose = require('mongoose')
mongoose.set('useNewUrlParser', true)
mongoose.set('useUnifiedTopology', true)
mongoose.set('useFindAndModify', true)


class Database {
    constructor() {
        this.connect()
    }

    connect() {
        mongoose.connect("mongodb+srv://hieupika:cityhunter2011@cluster0.jtgym.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
        .then(() => {
            console.log("success")
        })
        .catch((err) => {
            console.log('fail')
        })
    }
}

module.exports = new Database()