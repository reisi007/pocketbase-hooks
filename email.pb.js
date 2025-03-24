onRecordCreateRequest(({record, next, app}) => {
    const {meta} = e.app.settings();
    const {senderName, senderAddress} = meta
    const email = {
        address: senderAddress,
        name: senderName
    };

    const {firstName, lastName, email: userMail} = record.expandedOne("user");
    const {text} = record;

    const message = new MailerMessage({
        from: [email],
        to: [email],
        replyTo: {address: userMail(), name: firstName() + " " + lastName()},
        subject: `Neue Anmeldung für Shooting von ${firstName()} ${lastName()}!`,
        text: `${firstName()} ${lastName()} hat sich für ein Shooting angemeldet\n${text()}`
    });

    app.newMailClient().send(message);

    next();
}, "shootings");