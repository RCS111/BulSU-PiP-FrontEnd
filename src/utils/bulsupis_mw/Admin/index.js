import Account from "../Accounts"

import _request from '../utils/_request'
import Maps from "../utils/_map"

async function admin_getInstitute(id){
    let checkUser = await Account.isLoggedIn()
    if (checkUser.simple){

        let response = await _request(`/dev/institutes/${id}`)

        if (response){
            return {simple: response, full: response}
        }else{
            console.error(response)
            return {simple: false, full: response}
        }
    }
    else{
        return {simple: false, full: 'Not logged in'}
    }
}

async function admin_getAllInstitute(){
    let checkUser = await Account.isLoggedIn()
    if (checkUser.simple){

        let response = await _request('/dev/institutes')

        if (response){
            return {simple: response, full: response}
        }else{
            console.error(response)
            return {simple: false, full: response}
        }
    }
    else{
        return {simple: false, full: 'Not logged in'}
    }
}

async function admin_getAllAccounts(){
    let checkUser = await Account.isLoggedIn()
    if (checkUser.simple){

        let response = await _request('/dev/accounts')

        if (response){
            return {simple: response, full: response}
        }else{
            console.error(response)
            return {simple: false, full: response}
        }
    }
    else{
        return {simple: false, full: 'Not logged in'}
    }
}

async function admin_setAccountAccess(id, verified){
    let checkUser = await Account.isLoggedIn()
    if (checkUser.simple){

        let fd = new FormData()

        fd.append('data', JSON.stringify({id, verified}))

        let response = await _request(`/dev/accounts/${id || -1}`, fd, 'PUT')

        if (response){
            return {simple: response, full: response}
        }else{
            console.error(response)
            return {simple: false, full: response}
        }
    }
    else{
        return {simple: false, full: 'Not logged in'}
    }
}

/**
 * Admin: Deletes the account of the provided Account ID
 * @param  {String} id The account to be deleted
 * @return {Object}      { data: {...}, query: "..." }
 */
async function admin_setAccountDelete(id){
    let checkUser = await Account.isLoggedIn()
    if (checkUser.simple){

        let fd = new FormData()

        fd.append('data', JSON.stringify({id}))

        let response = await _request(`/dev/accounts/${id || -1}`, fd, 'DELETE')

        if (response){
            return {simple: response, full: response}
        }else{
            console.error(response)
            return {simple: false, full: response}
        }
    }
    else{
        return {simple: false, full: 'Not logged in'}
    }
}

async function admin_getProjectInfo(id){
    let checkUser = await Account.isLoggedIn()
    if (checkUser.simple){

        let response = await _request(`/dev/projects/${id || -1}`)

        response.data = Maps.project_camelCase(response.data)

        if (response){
            return {simple: response, full: response}
        }else{
            console.error(response)
            return {simple: false, full: response}
        }
    }
    else{
        return {simple: false, full: 'Not logged in'}
    }
}

async function admin_setStatus(id, status_code){
    let checkUser = await Account.isLoggedIn()
    if (checkUser.simple){

        let fd = new FormData()

        fd.append('data', JSON.stringify({id, status: status_code}))

        let response = await _request(`/dev/projects/${id || -1}`, fd, 'PUT')

        if (response){
            return {simple: response, full: response}
        }else{
            console.error(response)
            return {simple: false, full: response}
        }
    }
    else{
        return {simple: false, full: 'Not logged in'}
    }
}

async function admin_projectEdit(data, pdo_signature){
    let checkUser = await Account.isLoggedIn()
    if (checkUser.simple){

        let fd = new FormData()

        data = Maps.project_lowerSnaking(data)

        fd.append('data', JSON.stringify(data))

        if (pdo_signature){
            for (let f in pdo_signature){
                fd.append('pdo_signature', pdo_signature[f])
            }
        }

        let response = await _request(`/dev/projects/${-1}`, fd, 'PUT')

        if (response){
            return {simple: response, full: response}
        }else{
            console.error(response)
            return {simple: false, full: response}
        }
    }
    else{
        return {simple: false, full: 'Not logged in'}
    }
}

const Admin = {
    Institutes : {
        get : admin_getInstitute,
        getAll : admin_getAllInstitute
    },
    Account : {
        getAll: admin_getAllAccounts,
        delete: admin_setAccountDelete,
        setVerification: admin_setAccountAccess
    },
    Projects : {
        get : admin_getProjectInfo,
        setStatus: admin_setStatus,
        edit: admin_projectEdit
    }
}

export default Admin