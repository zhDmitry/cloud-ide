const express = require('express');
const spawn = require('child_process').exec;
const app = express()
const fs = require('fs');
const getRunCommand = require('./commands');
var bodyParser = require('body-parser')


app.use(bodyParser())

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const onError = (data, res) => {
    res.send(400, {
        error: JSON.stringify(data)
    })
}

const getRunner = (meta) => {
    console.log(meta);
    return getRunCommand(meta.extension, meta.file);
}


app.post('/build', (req, res) => {
    const data = req.body;
    fs.writeFileSync(`./docker/${data.meta.file}`, data.code);
    const result = spawn(getRunner(data.meta),
        (error, out, stder) => {
            res.status(error ? 400 : 200)
                .json({
                    result: error ? (error.message) : out
                })
        });

    setTimeout(() => {
        result.kill();
    }, 2000)

})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})