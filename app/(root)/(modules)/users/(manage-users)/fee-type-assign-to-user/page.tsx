import FeeTypeAssignToUser from "@/components/modules/users/manageUsers/feeTypeAssignToUser";
import { getCurrentUser } from "@/lib/auth/session";

export default async function Page(){

    const user = await getCurrentUser();

    return(
        <div>
            <FeeTypeAssignToUser user={user}/>
        </div>
    )
}