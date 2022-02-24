

const users = []

const addUser = ({id,name}) => {
    name = name.trim().toLowerCase()
    const existing = users.find(user=>user.name===name)

    if(existing){
        return {error : 'Username already exists !'}
    }

    const user = {id,name}
    users.push(user)
    return user
}

const removeUser = (id) => {

    const index  = users.findIndex(user=>user.id===id)
    
    if(index!==-1){
        return users.splice(index,1)[0]
    }
}

const getUser = (id) => {

    return users.filter(user=>user.id===id)[0]
}

const getAllUsers = () =>{
return users
}


module.exports = {addUser,removeUser,getUser,getAllUsers}