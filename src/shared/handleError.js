export const handleError = error => {
    let message = ''
    if (error.response) {
        if(typeof error.response.data == "object") {
            if(error.response.data.errors) {
                let keys = Object.keys(error.response.data.errors)
                keys.forEach(key => message += error.response.data.errors[key]+ '\n')
                return message
            } else return error.response.data
        }
        else return error.response.data
    }
    else if (error.request) return error.request
    else if (error.message) return error.message
    else {
        console.log(error)
        let keys = Object.keys(error)
        console.log(keys)
        keys.forEach(key => message += error[key]+ '\n')
        return message
    }
}