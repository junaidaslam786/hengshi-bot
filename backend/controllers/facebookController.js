import asyncHandler from 'express-async-handler';

const receivedUpdates = [];



const getUpdates = asyncHandler(async (req, res) => {
    console.log(req);
    res.send(`<pre>${JSON.stringify(receivedUpdates, null, 2)}</pre>`);
  });

  const verifySubscription = asyncHandler(async (req, res) => {
    const { 'hub.mode': hubMode, 'hub.verify_token': hubVerifyToken } = req.query;

    if (hubMode !== 'subscribe' || hubVerifyToken !== process.env.TOKEN) {
      return res.sendStatus(400);
    }

    res.send(req.query['hub.challenge']);
  });

  const receiveFacebookUpdate = asyncHandler(async (req, res) => {
    console.log('Facebook request body:', req.body);

    if (!req.isXHubValid()) {
      console.log('Warning - request header X-Hub-Signature not present or invalid');
      return res.sendStatus(401);
    }

    console.log('request header X-Hub-Signature validated');
    receivedUpdates.unshift(req.body);
    res.sendStatus(200);
  });

  const receiveInstagramUpdate = asyncHandler(async (req, res) => {
    console.log('Instagram request body:', req.body);
    receivedUpdates.unshift(req.body);
    res.sendStatus(200);
  });

export {
  getUpdates,
  verifySubscription,
  receiveFacebookUpdate,
  receiveInstagramUpdate,
};
