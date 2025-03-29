type User = core.Record & Accessor<{
    firstName: string,
    lastName: string,
    email: string
}>

type Registrierung = core.Record & Accessor<{
    user: string,
    text: string
}>
