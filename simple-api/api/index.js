module.exports = function(app) {
    app.get('/books', (req, res) => {
        res.send('Hello world Response')
    });
};