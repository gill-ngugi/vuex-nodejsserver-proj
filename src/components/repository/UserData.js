class UserData{
        
    static userFullName="";
    static accessToken="";   
        constructor(){       
            
        }
     
    static setAccessToken=(accessToken)=>{
        UserData.accessToken = accessToken;
    }

    static getAccessToken=()=>{
        return UserData.accessToken;
    }

    static setUserName=(userName)=>{
        UserData.userName = userName;
    }

    static getUserName=()=>{
        return UserData.userName;
    }

    static setUserPassword=(userPassword)=>{
        UserData.userPassword = userPassword;
    }

    static getUserPassword=()=>{
        return UserData.userPassword;
    }

    static setCompanyCode=(companyCode)=>{
        UserData.companyCode = companyCode;
    }

    static getCompanyCode=()=>{
        return UserData.companyCode;
    }

    static setUserId=(userId)=>{
        UserData.userId = userId;
    }

    static getUserId=()=>{
        return UserData.userId;
    }

    static setCompanyId=(companyId)=>{
        UserData.companyId = companyId;
    }

    static getCompanyId=()=>{
        return UserData.companyId;
    }

    static setCompanyListId=(companyId)=>{
        UserData.companyId = companyId;
    }

    static getCompanyListId=()=>{
        return UserData.companyId;
    }

    static setDocumentId=(itemId)=>{
        UserData.itemId = itemId;
    }

    static getDocumentId=()=>{
        return UserData.itemId;
    }

    static getUserData(itemId=0,parentItemId=0){   
       this.parentItemId=parentItemId;
       const formData = new FormData();
       formData.append('userId', "45");
       formData.append('companyCode',"010");
       formData.append('accessToken',"97f914eb1ceb1867e3824f647f7e589b");
       formData.append('model', "getMeetingPackFolder");
       formData.append('companyId', "2");
       formData.append('itemId', itemId);
       return formData;      
    }

    static getBaseUrl=()=>{
        return "https://eserver1.stl-horizon.com/api_v13/frontend/web/user/create"; 
    }   
}

export default UserData;