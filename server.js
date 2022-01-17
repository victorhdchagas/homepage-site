// Heroku Server
import path from 'path';
import express from 'express';

var app = express();

app.use(express.static(path.join(__dirname, 'dist')));
app.get('/api', (req, res) => {
    res.status(200).json({ "user": "wutachi" })
})
app.set('port', process.env.PORT || 8080);

var server = app.listen(app.get('port'), function() {
    console.log('listening on port ', server.address().port);
});
