import { User } from "screens/projectList/searchPanel";
import { useEffect } from "react";
import { cleanObject } from "utils";
import { useHttp } from "utils/http";
import { useAsync } from "utils/useAsync";

export const useUsers = (param?: Partial<User>) => {
    const client = useHttp();
    const { run, ...result } = useAsync<User[]>();

    useEffect(() => {
        run(client('classes', { data: cleanObject(param || []) }));
    }, [param])

    return result;
}