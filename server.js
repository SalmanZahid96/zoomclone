const { Socket } = require('dgram')
const express = require('express')
const app = express()
var server = http.createServer(app);
var io = require('socket.io')(server);
const { v4: uuidV4 } = require('uuid')
const port = 3000;


app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/' , (req,res) => {
    res.redirect(`/${uuidV4()}`)
})
app.get('/:room', (req, res)=>{
    res.render('room', {roomId:req.params.room})
})

io.on('connection', socket => {
    socket.on('join-room', (roomId,userId) => {
        socket.join(roomId)
        socket.to(roomId).broadcast.emit('user-connected',userId)

    })
})
app.listen(process.env.PORT || port, () => console.log(`Example app listening at http://localhost:${port}`));