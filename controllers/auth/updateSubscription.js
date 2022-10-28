const {User} = require("../../models/user")
const {RequestError} = require("../../helpers")

const updateSubscription = async (req, res) => {
    const {id} = req.user;
    const result = await User.findOneAndUpdate({_id: id}, req.body, {new: true});
        if(!result){
            throw RequestError(404, "Not found")
        }
        res.status(201).json({
            name: result.name,
            email: result.email,
            subscription: result.subscription,
        })
}

module.exports = updateSubscription;