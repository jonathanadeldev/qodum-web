import FormCom from "@/components/modules/users/manageUsers/createUser/FormCom";
import { getCurrentUser } from "@/lib/auth/session";

export default async function Page(){

    const user = await getCurrentUser();

    return(
        <div>
            <FormCom user={user}/>
        </div>
    )
}