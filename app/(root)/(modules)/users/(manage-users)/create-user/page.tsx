import CreateUser from "@/components/modules/users/manageUsers/createUser";
import { getCurrentUser } from "@/lib/auth/session";

export default async function Page(){

    const user = await getCurrentUser();

    return(
        <div>
            <CreateUser user={user}/>
        </div>
    )
}