import Subscriber from '../models/subscriber.js';


const subscribe = async (req, res) => {
  const {email} = req.body;
  if(!email){
    return res.status(400).json({message:"Email is required"})
  }
  try {
    const subscriber = await Subscriber.findOne({email});
    if(subscriber){
      return res.status(400).json({message:"You have already subscribed!"})
    }
    const newSubscriber = new Subscriber({email});
    await newSubscriber.save();
    res.status(201).json({message:"You have successfully subscribed!"})
  } catch (error) {
    console.error("Server error in subscribing: ", error)
    res.status(500).send("Server error in subscribing!")
  }
}

export {subscribe}