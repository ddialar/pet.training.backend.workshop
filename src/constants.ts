export const UUID4_REGEX = /^[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}$/

export const PLAIN_PASSWORD_REGEX = /^[a-zA-Z0-9.:\-_$]{8,}$/
export const JWT_REGEX = /^[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*$/

export const DATE_REGEX = /^[0-9]{4}(-[0-9]{2}){2}T[0-9]{2}(:[0-9]{2}){2}$/
export const DATE_ISO_REGEX = /^[0-9]{4}-[0-9]{2}-[0-9]{2}T([0-9]{2}:){2}[0-9]{2}\.[0-9]{3}Z$/
