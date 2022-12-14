const { useEffect, useState } = require("react")

const UseSeller = email =>{
    const [isSeller, setIsSeller] = useState(false);
    const [sellerLoading, setSellerLoading] = useState(true);
    useEffect(()=>{
        fetch(`https://resell-phones-server.vercel.app/user/seller/${email}`,{
            headers:{
                authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
        .then(res => res.json())
        .then(data =>{
            setIsSeller(data);
            setSellerLoading(false);
        })
    },[email])
    return [isSeller, sellerLoading];
}

export default UseSeller;