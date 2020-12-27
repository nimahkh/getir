export function response(status, data, res){
    const structure={
        code : status? 1 : 0,
        msg : status? status : "",
    }
    Object.keys(data).map(item=>{
        structure[item] = data[item]
    })
    res.json(structure)
}