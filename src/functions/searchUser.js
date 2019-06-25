export default function searchUser(search){
    return function(x){
        var name = x.firstName + ' ' + x.lastName + ' ' + x.contactNumber + ' ' + x.email + ' ' + x.sex;
        return name.toLowerCase().includes(search.toLowerCase()) || !search;
    }
}


