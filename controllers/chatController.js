const Message = require('../models/Message');

exports.sendMessage = async (req, res) => {

    const senderId = req.user.id;

    const {
        receiverId,
        message
    } = req.body;

    const msg = await Message.create({
        senderId,
        receiverId,
        message
    });

    res.json(msg);
};

exports.getMessages = async (
    req,
    res
) => {

    const userId = req.user.id;

    const otherUserId =
        req.params.userId;

    const messages =
        await Message.find({
            $or: [
                {
                    senderId: userId,
                    receiverId: otherUserId
                },
                {
                    senderId: otherUserId,
                    receiverId: userId
                }
            ]
        }).sort({
            createdAt: 1
        });

    res.json(messages);

};