console.log("email hook aktiviert")

onRecordAfterCreateSuccess(({record: r, next, app}) => {
    const record = r as unknown as Registrierung;
    if (record === undefined) {
        next()
        return
    }
    try {
        const {meta} = app.settings();

        const {senderName, senderAddress} = meta
        const email = {
            address: senderAddress,
            name: senderName
        };

        app.expandRecord(record, ["user"], undefined as any)
        record.expand()

        const user = record.expandedOne("user");
        const text = record.getString("text");

        const firstName = user.getString("firstName");
        const lastName = user.getString("lastName");
        const userMail = user.email()
        const message = new MailerMessage({
            from: email,
            to: [email],
            headers: {
                "Reply-To": `"${firstName} ${lastName}" <${userMail}>`
            },
            subject: `Neue Anmeldung für ein Shooting von ${firstName} ${lastName}!`,
            text: `${firstName} ${lastName} hat sich für ein Shooting angemeldet.Details:\n\n${text}`
        });

        app.newMailClient().send(message);
    } catch (e: any) {
        console.log("error sending email", e.message, e.stack)
    }

    next();
}, "registrierung");