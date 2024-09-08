const axios = require('axios')

const api_url = 'https://bcsapi.xyz/api/captcha/recaptcha'


const get_id = async (page_url, site_key, access_token) => {
    try {
        const body = {page_url,site_key,access_token}
        const res = await axios.post(api_url, body)
        if (res.data) {
            return res.data?.id
        }else{
            return res
        }
    } catch (error) {
        console.log(error)
    }

}

const get_token = async (id,sum,access_token) => {
    try {
        const url = `https://bcsapi.xyz/api/captcha/${id}?access_token=${access_token}`
        const res = await axios.get(url)
        if (res.data.status == 'pending'){
            console.log("tries",sum)
            return setTimeout(async()=>{
                sum+=1
                return await get_token(id, sum,access_token)
            },10000)
        }
        return res.data
    } catch (error) {
        console.log(error)
    }   
}






module.exports = {get_id, get_token}
