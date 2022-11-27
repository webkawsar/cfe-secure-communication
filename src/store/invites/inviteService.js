import axiosPrivateInstance from "../../axios";




const getInvitesUserList = async () => {
    const token = localStorage.getItem('token');
    console.log(token, 'token')

    const response = await axiosPrivateInstance(token).get('/invites');
    const responseData = response.data;
    return responseData;
}



const inviteService = {
    getInvitesUserList
}

export default inviteService;