import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserById } from "../../utils/services/usersService";

function UserDetails(){
    const params = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        getUserById(params.id)
        .then(response => setUser(response.data))
        
    },[params.id])
return (
<div>
<p>Email: {user?.email} details page..</p>
</div>
)
}
export default UserDetails;