export default {
    phone: v => {
        const reg = /^1[3|4|5|7|8][0-9]{9}$/
        return v && reg.test(v)
    },
    email: v => {
        const reg = /^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/
        return v && reg.test(v)
    },
    name: v => {
        const reg = /^[a-zA-Z0-9]{4,12}$/
        return v && reg.test(v)
    }
}