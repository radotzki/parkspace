const functions = require('firebase-functions');
const cors = require('cors')({ origin: true });
const mailgun = require('mailgun-js');

exports.sendMail = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        const to = req.body.to;
        const subject = req.body.subject;
        const text = req.body.text;
        console.log('to', to);
        console.log('subject', subject);
        console.log('text', text);

        return sendMail(to, subject, text).then(() => {
            res.send({});
        });
    });
});


function sendMail(to, subject, text) {
    const emailSender = mailgun({
        apiKey: 'key-37adfc8308febb24ec231aa7fd7d64ec',
        domain: 'mail.tooki.pw',
    });

    const mail = { from: 'Parkspaces <info@mail.tooki.pw>', to, subject, text };

    return new Promise(resolve => {
        emailSender.messages().send(mail, (err, body) => {
            if (err) {
                console.error(err);
            }
            resolve();
        });
    })
}
