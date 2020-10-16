import Base64 from './base64'
import Permission from './permission'
import Date from './date'

export default {
    permission: Permission,
    base64: new Base64(),
    date: new Date()
}